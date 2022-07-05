import knex from "../db/db.js";

const request = (req, res) => {
  if (req.params.id) {
    requestUser(req.params.id, res);
    return;
  }

  knex("users")
    .select("*")
    .then((data) => {
      res.status(200).json(data);
    });
};

const requestUser = (id, res) => {
  knex("users")
    .select("*")
    .where({ id: id })
    .then((data) => {
      res.status(200).json(data[0].name);
    });
};

const add = (req, res) => {
  console.log(req.user)

  // const { name, man_number } = req.body;

  // if (!name) {
  //   res.status(400).send("you dumb");
  //   return;
  // }
  // // TODO : firebase_uuid from token.
  // //  validate that the name of the user is the same as firebase.
  // // NOTE : code bellow is just a filler till we get firebase auth up.
  // let firebase_uuid = Math.floor(Math.random() * 100);

  // knex("users")
  //   .select("*")
  //   .where({ name: name })
  //   .then((data) => {
  //     if (
  //       data.length === 0 &&
  //       !firebaseCheck("{INPUT TOKEN HERE}", "{WHAT DO YOU WANT TO CHECK HERE}")
  //     ) {
  //       return knex("users")
  //         .insert({ name, firebase_uuid, man_number })
  //         .then(() => {
  //           res.status(200).send("user added");
  //         });
  //     }
  //   });

  // knex('users')
  //   .insert({name, firebase_uuid, man_number})
  //   .then(data => {res.status(200).send(`${req.method} - add`);})
};

const remove = (req, res) => {
  res.status(200).send(`${req.method} - remove`);
};
const edit = (req, res) => {
  res.status(200).send(`${req.method} - edit`);
};

const firebaseCheck = (userData, type) => {
  let checked = false;
  if (type === "name") {
    // checks name in firebase vs what was provided
  }
  if (type === "uuid") {
    // checks uuid in firebase vs what was provided
  }
  return checked;
};
export { request, add, remove, edit };
