const express = require('express');
const jsonParser = require('body-parser').json();
const Image = require(__dirname + '/../models/image');
const handleError = require(__dirname + '/../lib/handle_server_error');
const imageRouter = module.exports = exports = express.Router();

imageRouter.get('/images', (req, res) => {
  Image.find({}, (err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});

imageRouter.post('/images', jsonParser, (req, res) => {
  var newImage = new Image(req.body);
  newImage.save((err, data) => {
    if (err) return handleDBError(err, res);
    res.status(200).json(data);
  });
});
