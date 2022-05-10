const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./dbConnection');
const awardsRouter = require('./routes/awards');
const requirementsRouter = require('./routes/requirements');
const demographicsRouter = require('./routes/demographics');
const packagesRouter = require('./routes/packages');
const mentorsRouter = require('./routes/mentors');
const menteesRouter = require('./routes/mentees');
const usersRouter = require('./routes/users');
const sfscsRouter = require('./routes/sfscs');
const unitsRouter = require('./routes/units');

app.use(cors());
app.use('/awards', awardsRouter);
app.use('/requirements', requirementsRouter);
app.use('/demographics', demographicsRouter);
app.use('/packages', packagesRouter);
app.use('/users/mentors', mentorsRouter);
app.use('/users/mentees', menteesRouter);
app.use('/users', usersRouter);
app.use('/sfscs', sfscsRouter);
app.use('/units', unitsRouter);

app.get('/', (req, res) => {
    db
    .select('*')
    .from('users')
    .then(() => res.status(200).json('Hello'))
})

module.exports = app;

