const express = require('express');
const studentsRouter = require('./students');

const app = express();

app.use('/students', studentsRouter);

module.exports = app;
