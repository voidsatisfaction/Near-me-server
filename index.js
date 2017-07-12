var express = require('express');

var bodyParser = require('body-parser');
var morgan = require('morgan');

var rp = require('request-promise');

var app = express();

var PORT = process.env.PORT || 3003;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.send('worked');
});

var yahooMapHost = 'https://map.yahooapis.jp/placeinfo/V1/get';
var yahooAppId = 'dj00aiZpPUFuRWxDTE5rZFBBayZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-';

app.get('/myplace', function(req, res) {
  var lat = req.query.lat;
  var lon = req.query.lng;
  
  var uri = `${yahooMapHost}?lat=${lat}&lon=${lon}&appid=${yahooAppId}`;
  var options = {
    method: 'GET',
    uri,
    json: true
  }

  rp(options)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500);
    })
});

var connpassHost = 'https://connpass.com/api/v1/event/';

app.get('/myplace/events', function(req, res) {
  var place = encodeURIComponent(req.query.place);
  var uri = `${connpassHost}?keyword=${place}`;
  var options = {
    method: 'GET',
    uri,
    json: true,
    headers: {
      'User-Agent': 'Request-Promise'
    }
  };
  rp(options)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500);
    })
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});