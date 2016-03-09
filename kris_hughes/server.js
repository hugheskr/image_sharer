var mongoose = require('mongoose');
var express = require('express');
var app = express();
var imagesRouter = require(__dirname + '/routes/image_routes');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/image_stream_dev');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5000');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  next();
});

app.use('/api', imagesRouter);

app.listen(process.env.PORT || 3000, function() {
	  console.log('server up');
});
