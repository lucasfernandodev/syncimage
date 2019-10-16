const express = require('express');
const multer = require('multer');
const UserController = require("./controllers/UserController");
const ImageController = require("./controllers/ImageController");
const multerConfig = require('./config/multer');
const routes = express.Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/image',ImageController.index);

routes.post('/image', multer(multerConfig).single('file'), ImageController.store);

module.exports = routes;