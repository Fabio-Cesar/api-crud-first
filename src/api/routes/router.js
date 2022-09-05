const app = require('express').Router();
const getUsers = require('../controllers/getUsers');
const getUserByID = require('../controllers/getUserByID');
const addUser = require('../controllers/addUser');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');

// Rotas GET
app.get('/usuarios', getUsers)
app.get('/usuarios/:id', getUserByID)
// Rotas POST
app.post('/usuarios', addUser)
// Rotas PUT
app.put('/usuarios/:id', updateUser)
// Rotas DELETE
app.delete('/usuarios/:id', deleteUser)

module.exports = app;