const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

//HELPER FUNCTIONS//
const checkTime = (time) => {
  //returns bool if a time stamp is in the proper format or not
  // move this to separate function
  return time.charAt(10) === "T" && time.charAt(time.length - 1) === "Z";
};

const checkKeys = (validkeys, bodyKeys) => {
  return Object.keys(bodyKeys).every((element) => {
    return validKeys.includes(element);
  });
};

// GET
const orgRequest = (req, res) => {
  console.log(`working on get for /tasks/orgs/${req.params.orgid}`);
  // values given for each task {id, title, status, priority, suspense date, author_rank, author_name (database is author_id)}
  knex("tasks")
    .join("users", "users.id", "=", "tasks.author_id")
    .select(
      "tasks.id as task_id",
      "tasks.title as task_title",
      "tasks.status as task_status",
      "tasks.priority as task_priority",
      "tasks.suspense_date as task_suspense_date",
      "users.rank as author_rank",
      "users.name as author_name"
    )
    .where("tasks.org_id", "=", req.params.orgid)
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
};

const userRequest = (req, res) => {
  console.log(`working on get for /tasks/users/${req.params.userid}`);
  //{id, title, status, priority, suspense date, author_rank, author_name (database is author_id)}

  knex("tasks")
    .join("users_tasks as ut", "task_id", "=", "tasks.id")
    .select(
      "tasks.id as task_id",
      "tasks.title as task_title",
      "tasks.status as task_status",
      "tasks.priority as task_priority",
      "tasks.suspense_date as task_suspense_date",
      "tasks.author_id as author_id"
    )
    .where("ut.user_id", "=", req.params.userid)
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
};

const detailedRequest = (req, res) => {
  console.log(`working on get for /tasks/${req.params.taskid}`);
  // {id, title, description, priority, assigned date, suspense date,
  // completed_date, status, owner(s) (array of objects with rank and name),
  // author_rank, author_name (database is author_id), comments ({id, body, parent_id, user_id, timestamp})
  let promiseArr = [];

  promiseArr.push(
    knex("tasks")
      .join("users as authors", "authors.id", "=", "tasks.author_id")
      .select(
        "tasks.id as task_id",
        "tasks.title as task_title",
        "tasks.description as task_description",
        "tasks.status as task_status",
        "tasks.priority as task_priority",
        "tasks.assigned_date as task_assigned_date",
        "tasks.suspense_date as task_suspense_date",
        "tasks.completed_date as task_completed_date",
        "authors.rank as author_rank",
        "authors.name as author_name"
      )
      .where("tasks.id", "=", req.params.taskid)
  );

  promiseArr.push(
    knex("users as owners")
      .join("users_tasks as ut", "ut.user_id", "=", "owners.id")
      .select("owners.rank as owner_rank", "owners.name as owner_name")
      .where("ut.task_id", "=", req.params.taskid)
  );

  promiseArr.push(
    knex("comments")
      .join("users", "users.id", "=", "comments.user_id")
      .select(
        "comments.id as comment_id",
        "comments.body as comment_body",
        "users.rank as user_rank",
        "users.name as user_name",
        "comments.timestamp as comment_timestamp"
      )
      .where("comments.task_id", "=", req.params.taskid)
  );

  Promise.all(promiseArr)
    .then((data) => {
      const body = [
        {
          ...data[0][0],
          owners: data[1],
          comments: data[2],
        },
      ];
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(body);
    })
    .catch(() =>
      console.log(`there was an error with /tasks/${req.params.taskid}`)
    );
};

const orgWar = (req, res) => {
  console.log(`working on get for /war/orgs/${req.params.orgid}`);
  //{id, title, completed_date, owner(s)}
  /*
    {
      id:
      title:
      completed_date
      owners: [
        {},
        {}
      ]
    }
  */
  let promiseArr = [];

  promiseArr.push(
    knex("tasks")
      .select(
        "tasks.id as task_id",
        "tasks.title as task_title",
        "tasks.completed_date as task_completed_date",
        "tasks.status as task_status"
      )
      .where("tasks.org_id", "=", req.params.orgid)
  );

  promiseArr.push(
    knex("users as owners")
      .join("users_tasks as ut", "ut.user_id", "=", "owners.id")
      .join("tasks", "tasks.id", "=", "ut.task_id")
      .select(
        "tasks.id as task_id",
        "owners.rank as owner_rank",
        "owners.name as owner_name"
      )
      .where("tasks.org_id", "=", req.params.orgid)
      .then((data) => {
        console.log(`owners: `, data);
        return data;
      })
  );

  Promise.all(promiseArr).then((data) => {
    const body = data[0].map((task) => {
      let owners = [];
      data[1].forEach((owner) => {
        if (parseInt(owner.task_id) === parseInt(task.task_id)) {
          owners.push({ rank: owner.owner_rank, name: owner.owner_name });
        }
      });
      task.owners = owners;
      return task;
    });
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).send(body);
  });
};

const userWar = (req, res) => {
  console.log(`working on get for /war/users/${req.params.userid}`);
  //{id, title, completed_date}
  knex("tasks")
    .join("users_tasks as ut", "ut.task_id", "=", "tasks.id")
    .select(
      "tasks.id as task_id",
      "tasks.title as task)_title",
      "tasks.completed_date as task_completed_date",
      "tasks.status as task_status"
    )
    .where("ut.user_id", "=", req.params.userid)
    .then((data) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data);
    });
};

// POST at /tasks
const addTask = async (req, res) => {
  //possible more error checking needed?
  console.log(`working on get for /tasks`);
  let isValid = true;
  // still need to do data validation here
  if (req.body.creator_id === undefined || req.body.org_id === undefined) {
    res.status(301).send("creator id or org id does not exist");
    return;
  }
  //make sure that the creator_id is in the users table
  if (req.body.creator_id) {
    await knex("users")
      .select("*")
      .where("id", "=", req.body.creator_id)
      .then((data) => {
        if (data.length <= 0) {
          isValid = false;
          res.status(301).send("is not a valid user");
          return;
        }
      });
  }
  //make sure the org_id is in the org table
  else if (req.body.org_id) {
    await knex("organizations")
      .select("*")
      .where("id", "=", req.body.org_id)
      .then((data) => {
        if (data.length <= 0) {
          isValid = false;
          res.status(301).send("is not a valid organization");
          return;
        }
      });
  }
  knex("tasks")
    .insert({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      suspense_date: req.body.suspense_date,
      status: req.body.status,
      completed_date: null,
      assigned_date: knex.fn.now(),
      author_id: req.body.creator_id,
      org_id: req.body.org_id,
    })
    .returning("id")
    .then((id) => {
      console.log(id[0].id);
      const fieldsToInsert = req.body.owners.map((ownerId) => ({
        user_id: ownerId,
        task_id: id[0].id,
      }));
      knex("users_tasks")
        .insert(fieldsToInsert)
        .then((data) => {
          res.status(200).send(data);
        });
    });
};

const addTaskUser = (req, res) => {
  // insert into tasksusers table.
  let body = req.body;
  console.log(`working on post request for /owners/${req.params.taskid}`);

  if (Object.keys(body).includes("owners")) {
    const fieldsToInsert = req.body.owners.map((ownerId) => ({
      user_id: ownerId,
      task_id: parseInt(req.params.taskid),
    }));

    knex("users_tasks")
      .insert(fieldsToInsert)
      .then((data) => {
        res.status(200).send(data);
      });
  } else {
    res.status(301).send("does not include field owners");
  }
};

// POST req at /tasks/:taskid/comments, creates a new comment for a task
// Req body that API is receiving: {body: 'blah blah blah', author: 1}
const addComment = (req, res) => {
  const fieldsToInsert = {
    body: req.body.body,
    task_id: parseInt(req.params.taskid),
    user_id: req.body.author,
  };
  console.log(
    `working on post request for /tasks/${req.params.taskid}/comments`
  );
  knex("comments")
    .where("task_id", "=", parseInt(req.params.taskid))
    .insert(fieldsToInsert)
    .returning("*")
    .catch((err) => console.log(err))
    .then((data) => {
      res.status(200).send(data);
    });
};

// PATCH req at /tasks/:taskid
const editTask = async (req, res) => {
  console.log(`working on patch for /tasks/${req.params.taskid}`);
  console.log(req.params);
  console.log(req.body);
  let keys = [
    //suspense date is the only changeable date
    "title",
    "description",
    "priority",
    "suspense_date",
    "status",
    "org_id",
    "author_id",
  ];
  let body = req.body;
  let validTimeStamp;

  if (body.suspense_date) {
    validTimeStamp = checkTime(body.suspense_date);
  } else {
    validTimeStamp = true;
  }

  const validRequest = Object.keys(body).every((element) => {
    return keys.includes(element);
  });
  console.log(validTimeStamp);
  console.log(validRequest);

  if (validTimeStamp && validRequest) {
    knex("tasks")
      .where("tasks.id", "=", parseInt(req.params.taskid))
      .update(req.body, Object.keys(req.body))
      .then(() => {
        knex("tasks")
          .select("*")
          .where("tasks.id", "=", parseInt(req.params.taskid))
          .then((data) => {
            res.status(200).json(data);
          });
      });
  } else {
    res.status(404).send("Task edit was unsuccessful");
  }
};

const deleteTask = (req, res) => {
  console.log(`working on delete for /tasks/${req.params.taskid}`);
  knex("users_tasks")
    .where("task_id", "=", req.params.id)
    .del()
    .then(() => {
      knex("comments")
        .where("task_id", "=", req.params.id)
        .del()
        .then(() => {
          knex("tasks")
            .where("tasks.id", "=", parseInt(req.params.id))
            .del()
            .then((data) => {
              res.status(200).send(`Number of records deleted: ${data}`);
            });
        });
    });
};

const deleteTaskUsers = (req, res) => {
  console.log(`working on delete for /owners/${req.params.taskid}`);
  let body = req.body
  const fieldsToDelete = req.body.owners.map((ownerId) => ({
    user_id: ownerId,
    task_id: parseInt(req.params.taskid),
  }))
  knex("users_tasks")
    .where(fieldsToDelete)
    .del()
    .then((data) => {
      res.status(200).send(`Number of records deleted: ${data}`);
    })

}

module.exports = {
  orgRequest,
  userRequest,
  detailedRequest,
  orgWar,
  userWar,
  addTask,
  addTaskUser,
  addComment,
  editTask,
  deleteTask,
  deleteTaskUsers,
};
