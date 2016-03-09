const express = require('express');

express().use(express.static(__dirname + '/build'))
  .use('*', function(req, res) {
	  res.sendFile(__dirname + '/build/four_oh_four_view.html');
  })
  .listen(5000, () => console.log('server up'));
