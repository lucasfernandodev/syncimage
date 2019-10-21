const express = require('express');

const UserController = require("./controllers/UserController");
const ImageController = require("./controllers/ImageController");
const CategoryController = require("./controllers/CategoryController");

const routes = express.Router();

// users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.post('/authenticate', UserController.authenticate);

// Images
routes.get('/image',ImageController.index);
routes.get('/image/:id',ImageController.show);
routes.post('/image', ImageController.store);

routes.get('/category', CategoryController.index);
routes.get('/category/:id', CategoryController.show);
routes.post('/category', CategoryController.store);
routes.put('/category/:id', CategoryController.update);


module.exports = routes;