const express = require('express');
const authMeddleware = require("./config/auth");

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
routes.get('/image',authMeddleware,ImageController.index);
routes.get('/image/:id',authMeddleware,ImageController.show);
routes.post('/image',authMeddleware, ImageController.store);

routes.get('/category',authMeddleware, CategoryController.index);
routes.get('/category/:id',authMeddleware, CategoryController.show);
routes.post('/category',authMeddleware, CategoryController.store);
routes.put('/category/:id',authMeddleware, CategoryController.update);


module.exports = routes;