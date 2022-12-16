const express = require('express');
const session = require('express-session');
const store = new session.MemoryStore();
const cors = require('cors');
const morgan = require("morgan");
const bcrypt = require("bcrypt");
const app = express();

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

const saltRounds = 12; 
const { hash, compare } = bcrypt;

app.set('trust proxy', 1);
app.use(session({
  store,
  secret: process.env.SESSION_SECRET || 'mySecret',
  saveUninitialized: false,
  resave: false,
  name: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true, 
    maxAge: 1000 * 60 * 30, 
    sameSite: 'lax',
    // sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'none',
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    origin: [process.env.UI_URL || 'http://localhost:3000', process.env.API_URL || 'http://localhost:8080'],
    credentials: true,
  })
);


// --------------------- AUTH ENDPOINTS ----------------------------

// REGISTER: creates user
app.post("/register", async (req, res) => {
  try {
    const maxIdQuery = await knex('users').max('id as maxId').first();
    let id = maxIdQuery.maxId + 1;
    let { body } = req;
    let { first_name, last_name, username, password, email, phone_number, role, rank, crew_position_id } = body;
    const passwordHash = await hash(password, saltRounds);
    await knex("users").insert({ id, first_name, last_name, username, passwordHash, email, phone_number, role, rank, crew_position_id });
    res.status(201).json("USER CREATED");
  } catch(err) {
    if (err.code === '23505') {
      console.log(err)
      res.status(403).json("User already exists");
    } else {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// LOGIN: creates session for user with specified username/password
app.post("/login", async (req, res) => {
  try {
    let { body } = req;
    let { username, password } = body;
    const data = await knex("users").where({ username });
    const { id, first_name, last_name, email, phone_number, role, rank, crew_position_id, passwordHash } = data[0];
    const hashedPass = passwordHash
    const isMatch = await compare(password, hashedPass);
    const user = { id, first_name, last_name, email, phone_number, role, rank, crew_position_id, username };
    if (isMatch) {
      req.session.user = user;
      res.status(202).json(req.session);
    }
    else res.status(401).json("Incorrect password");
  } catch(err) {
    res.status(500).json("Username does not exist")
  }
})

// LOGOUT: deletes session for current user
app.delete('/logout', (req, res) => {
  console.log(req.session)
  if (req.session.user) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).json('Unable to log out')
      } else {
        res.status(202).json('Logout successful')
      }
    });
  } else {
    res.status(202).json('Logout successful')
  }
})

// Custom Middleware to validate session
const validSession = (req, res, next) => {
  console.log(req.session);
  if (!req.session || !req.session.user) {
      res.status(401).json("You shall not pass")
  } else {
    next();
  }
}

// --------------------- USER ENDPOINTS ----------------------------

// GET users: gets all users, all members, or all leaders depending on query params
app.get("/users", validSession, async (req, res) => {
  try {
    const { role } = req.query;
    
    if (role === "leader") {
      let crew_positions = await knex('users').where('role', 'leader');
      crew_positions = crew_positions.map(({ passwordHash, ...rest }) => rest);
      res.status(200).send(crew_positions);
    } else if (role === "member") {
      let crew_positions = await knex('users').where('role', 'member');
      crew_positions = crew_positions.map(({ passwordHash, ...rest }) => rest);
      res.status(200).send(crew_positions);
    } else {
      let crew_positions = await knex('users');
      crew_positions = crew_positions.map(({ passwordHash, ...rest }) => rest);
      res.status(200).send(crew_positions);
    }
  } catch(err) {
      console.log(err);
      res.status(500).json(err.message);
  }
})

// --------------------- CREW POSITION ENDPOINTS ----------------------------

// GET crew_positions: gets all crew_positions
//app.get("/crew_positions", validSession, async (req, res) => {
app.get("/crew_positions", async (req, res) => {
  try {
      const crew_positions = await knex('crew_positions');
      res.status(200).send(crew_positions);
  } catch(err) {
      console.log(err);
      res.status(500).json(err.message);
  }
})

// POST crew_positions: creates a new crew position if role is leader
app.post("/crew_positions", async (req, res) => {
    try {
      const maxIdQuery = await knex('crew_positions').max('id as maxId').first();
      let id = maxIdQuery.maxId + 1;
      let { body } = req;
      await knex('crew_positions').insert({ ...body, id });
      res.status(201).json("CREW POSITION CREATED");
    } catch(err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

// --------------------- TIME SLOT ENDPOINTS ----------------------------

/* GET time_slots: if role is leader, returns all timeslots. If role is member, 
   only returns time_slots with a user_id that matches the user_id in the session */
app.get("/time_slots", validSession, async (req, res) => {
  const { need_replacement } = req.query;
  const user = req.session.user;
  try {
    if (need_replacement === 'true') {
      const time_slots = await knex('time_slots')
                                 .join('crew_positions', 'time_slots.crew_position_id', 'crew_positions.id')
                                 .select('*', 'crew_positions.name', 'time_slots.description')
                                 .where('type', 'replacement_needed');
      res.status(200).send(time_slots);
    }
    else if(user.role === "leader") {
      const time_slots = await knex('time_slots');
      res.status(200).send(time_slots);
    } else {
      const time_slots = await knex('time_slots')
                                .join('crew_positions', 'time_slots.crew_position_id', 'crew_positions.id')
                                .select('*', 'crew_positions.name', 'time_slots.description')
                                .where('user_id', user.id);
      res.status(200).send(time_slots);
    }
  } catch(err) {
      console.log(err);
      res.status(500).json(err.message);
  }
})

/* POST time_slots: if role is leader, creates a time_slot with the information
   in the body of the request. If role is member, creates a time_slot only if
   the type is not shift */
app.post("/time_slots", validSession, async (req, res) => {
    try {
      const maxIdQuery = await knex('time_slots').max('id as maxId').first();
      let id = maxIdQuery.maxId + 1;
      let { body } = req;

      if (req.session.user.role === "leader" || body.type !== "shift") {
        await knex('time_slots').insert({ ...body, id });
        res.status(201).json("TIME SLOT CREATED");
      } else {
        throw new Error("Only users in the leader role can create new shift time slots");
      }
    } catch(err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

/* PATCH time_slots: if role is leader, updates the given time_slot with the 
   information in the body of the request. If role is member, only updates the
   time_slot if the session user_id matches the user_id of the time slot
   AND they are not trying to update the type or start/end time */
app.patch("/time_slots/:id", validSession, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      let { body } = req;
      await knex('time_slots').where('id', id).update(body);
      res.status(201).json("TIME SLOT UPDATED");
    } catch(err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

/* DELETE time_slot: if role is leader, deletes the given time_slot If role 
   is member, only deletes the time_slot if the session user_id matches the 
   user_id of the time slot AND the time_slot is not of type shift */
app.delete("/time_slots/:id", validSession, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (req.session.user.role === "leader") {
        await knex('time_slots').where('id', id).del();
        res.status(201).json("TIME SLOT DELETED");
      } else {
        let curr_time_slot = await knex('time_slots').where('id', id);
        curr_time_slot = curr_time_slot[0];

        if (curr_time_slot.user_id !== req.session.user.id) {
          throw new Error("Members can only delete their own time slots");
        }

        await knex('time_slots').where('id', id).del();
        res.status(201).json("TIME SLOT DELETED");
      } 
    } catch(err) {
        console.log(err);
        res.status(500).json(err.message);
    }
})

module.exports = app;

