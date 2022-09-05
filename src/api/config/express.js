const express = require('express');
const routes = require('../routes/router');
const errors = require('../middlewares/errorHandler')

const app = express();

app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(errors);

module.exports = app;