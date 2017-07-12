var express = require('express');
var morgan = require('morgan');
var app = express();

var PORT = process.env.PORT || 3003;

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('worked');
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});