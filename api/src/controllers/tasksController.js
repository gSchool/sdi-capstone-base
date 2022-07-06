const env = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[env]
const knex = require('knex')(config)



// GET
const orgRequest = (req, res) => {
  console.log(`working on get for /tasks/orgs/${req.params.orgid}`)
  // values given for each task {id, title, status, priority, suspense date, author_rank, author_name (database is author_id)}
  knex('tasks')
    .join('users', 'users.id', '=', 'tasks.author_id')
    .select('tasks.id as task_id',
      'tasks.title as task_title',
      'tasks.status as task_status',
      'tasks.priority as task_priority',
      'tasks.suspense_date as task_suspense_date',
      'users.rank as author_rank',
      'users.name as author_name')
    .where('tasks.org_id', '=', req.params.orgid)
    .then(data => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data)
    })
}

const userRequest = (req, res) => {
  console.log(`working on get for /tasks/users/${req.params.userid}`)
  //{id, title, status, priority, suspense date, author_rank, author_name (database is author_id)}

  knex('tasks')
    .join('users_tasks as ut', 'task_id', '=', 'tasks.id')
    .select('tasks.id as task_id',
      'tasks.title as task_title',
      'tasks.status as task_status',
      'tasks.priority as task_priority',
      'tasks.suspense_date as task_suspense_date',
      'tasks.author_id as author_id',
    )
    .where('ut.user_id', '=', req.params.userid)
    .then(data => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data)
    })
}

const detailedRequest = (req, res) => {
  console.log(`working on get for /tasks/${req.params.taskid}`)
  // {id, title, description, priority, assigned date, suspense date,
  // completed_date, status, owner(s) (array of objects with rank and name),
  // author_rank, author_name (database is author_id), comments ({id, body, parent_id, user_id, timestamp})
  let promiseArr = [];

  promiseArr.push(
    knex('tasks')
      .join('users as authors', 'authors.id', '=', 'tasks.author_id')
      .select('tasks.id as task_id',
        'tasks.title as task_title',
        'tasks.description as task_description',
        'tasks.status as task_status',
        'tasks.priority as task_priority',
        'tasks.assigned_date as task_assigned_date',
        'tasks.suspense_date as task_suspense_date',
        'tasks.completed_date as task_completed_date',
        'authors.rank as author_rank',
        'authors.name as author_name')
      .where('tasks.id', '=', req.params.taskid)
  )

  promiseArr.push(
    knex('users as owners')
      .join('users_tasks as ut', 'ut.user_id', '=', 'owners.id')
      .select(
        'owners.rank as owner_rank',
        'owners.name as owner_name',
      )
      .where('ut.task_id', '=', req.params.taskid)
  )

  promiseArr.push(
    knex('comments')
      .join('users', 'users.id', '=', 'comments.user_id')
      .select(
        'comments.id as comment_id',
        'comments.body as comment_body',
        'users.rank as user_rank',
        'users.name as user_name',
        'comments.timestamp as comment_timestamp'
      )
      .where('comments.task_id', '=', req.params.taskid)
  )

  Promise.all(promiseArr)
    .then(data => {
      const body = [{
        ...data[0][0],
        owners: data[1],
        comments: data[2]
      }]
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(body)
    })
    .catch(() => console.log(`there was an error with /tasks/${req.params.taskid}`))
}

const orgWar = (req, res) => {
  console.log(`working on get for /war/orgs/${req.params.orgid}`)
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
    knex('tasks')
      .select('tasks.id as task_id',
        'tasks.title as task_title',
        'tasks.completed_date as task_completed_date',
        'tasks.status as task_status'
      )
      .where('tasks.org_id', '=', req.params.orgid)
  )

  promiseArr.push(
    knex('users as owners')
      .join('users_tasks as ut', 'ut.user_id', '=', 'owners.id')
      .join('tasks', 'tasks.id', '=', 'ut.task_id')
      .select(
        'tasks.id as task_id',
        'owners.rank as owner_rank',
        'owners.name as owner_name',
      )
      .where('tasks.org_id', '=', req.params.orgid)
      .then(data => { console.log(`owners: `, data); return data; })
  )

  Promise.all(promiseArr)
    .then(data => {
      const body = data[0].map(task => {
        let owners = []
        data[1].forEach(owner => {
          if (parseInt(owner.task_id) === parseInt(task.task_id)) {
            owners.push({ rank: owner.owner_rank, name: owner.owner_name });
          }
        })
        task.owners = owners;
        return task;
      })
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(body)
    })
}

const userWar = (req, res) => {
  console.log(`working on get for /war/users/${req.params.userid}`)
  //{id, title, completed_date}
  knex('tasks')
    .join('users_tasks as ut', 'ut.task_id', '=', 'tasks.id')
    .select('tasks.id as task_id',
      'tasks.title as task)_title',
      'tasks.completed_date as task_completed_date',
      'tasks.status as task_status'
    )
    .where('ut.user_id', '=', req.params.userid)
    .then(data => {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).send(data)
    })
}

// POST
const addTask = (req, res) => {
  console.log(`working on get for /tasks`)
}

const addComment = (req, res) => {
  console.log(`working on post for /tasks/${req.params.taskid}/comments`)
}

//not done yet
const editTask = (req, res) => {
  console.log(`working on patch for /tasks/${req.params.taskid}`)
  let keys = ['title', 'description', 'priority', 'assigned_date', 'suspense_date', 'completed_date', 'status', 'org_id', 'author_id']
  let validRequest = false;
  let validTimeStamp = false;

  if (request.body[keys[0]] || request.body[keys[1]] || request.body[keys[2]] || request.body[keys[3]] || request.body[keys[4]]
    || request.body[keys[5]] || request.body[keys[6]] || request.body[keys[7]] || request.body[keys[8]]) {
    validRequest = true;
  }
  //checks that the 10th character is a T and the last character is a Z to represent the timestamp format
  if(body.created_at.charAt(10) === 'T' && body.created_at.charAt(body.created_at.length - 1) === 'Z') {
    validTimeStamp = true;
  }

  if (validTimeStamp && validRequest) {
  knex('tasks')
  .where('tasks.id', '=', parseInt(req.params.id))
  .update()
  }

}

const deleteTask = (req, res) => {
  console.log(`working on delete for /tasks/${req.params.taskid}`)
  knex('user_tasks')
    .where('task_id', '=', req.params.id)
    .del()
    .then(() => {
      knex('comments')
        .where('task_id', '=', req.params.id)
        .del()
        .then(() => {
          knex('tasks')
            .where('tasks.id', '=', parseInt(req.params.id))
            .del()
            .then(data => {
              res.status(200).send(`Number of records deleted: ${data}`)
            })
        })
    })
}

module.exports = { orgRequest, userRequest, detailedRequest, orgWar, userWar, addTask, addComment, editTask, deleteTask }