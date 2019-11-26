const express = require('express');

const app = module.exports = express.Router();

//app.use(compression());

const model = require('../models/user-controller');

app.post('/api/user/create', model.createUser);
app.post('/api/user/login', model.login);
app.post('/api/user/logout', model.logout);
app.post('/api/secure/verify', model.verifyToken);