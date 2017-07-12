var express = require('express');

var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

var PORT = process.env.PORT || 3003;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('worked');
});

app.get('/myplace',function(req, res) {
  console.log(req.query);
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});