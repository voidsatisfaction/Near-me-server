var express = require('express');

var bodyParser = require('body-parser');
var morgan = require('morgan');

var moment = require('moment');

var rp = require('request-promise');

var app = express();

var PORT = process.env.PORT || 3003;
var DOORKEEPER_TOKEN = process.env.DOORKEEPER_TOKEN;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/build'));

app.get('/', function(req, res) {
  res.send('worked');
});

app.get('/myplace', function(req, res) {
  var lat = req.query.lat;
  var lon = req.query.lng;

  getUserLocation({ lat, lon })
    .then(getEventsAll)
    .then((data) => {
      data = data.reduce((prev, current) => {
        var name = Object.keys(current)[0];
        prev[name] = current[name];
        return prev;
      },{});
      res.status(200).json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500);
    })
});

function getUserLocation({ lat, lon }) {
  var yahooMapHost = 'https://map.yahooapis.jp/placeinfo/V1/get';
  var yahooAppId = 'dj00aiZpPUFuRWxDTE5rZFBBayZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-';

  var uri = `${yahooMapHost}?lat=${lat}&lon=${lon}&appid=${yahooAppId}`;
  var options = {
    method: 'GET',
    uri,
    json: true
  }

  return rp(options)
    .then((data) => {
      return data.ResultSet.Address[0];
    })
}

function getEventsAll(place) {
  return Promise.all([
    getConnpassEvents(place),
    getDoorkeeperEvents(place)
  ]);
}

function getConnpassEvents(place) {
  var connpassHost = 'https://connpass.com/api/v1/event/';

  var prefacture = encodeURIComponent(place.slice(0,-1));
  var prefactureFull = encodeURIComponent(place);

  var uri = `${connpassHost}?keyword_or=${prefactureFull}&count=100&order=2`;
  var options = {
    method: 'GET',
    uri,
    json: true,
    headers: {
      'User-Agent': 'Near-me'
    }
  };
  return rp(options)
    .then((data) => {
      var now = moment();
      var filteredEvents = data.events.filter((event) => now.isSameOrBefore(event.started_at));
      data.events = filteredEvents;
      return { connpass: data.events };
    })
}

function getDoorkeeperEvents(place) {
  var doorkeeperHost = 'https://api.doorkeeper.jp';
  var doorkeeperToken = DOORKEEPER_TOKEN;

  var prefacture = encodeURIComponent(place.slice(0,-1));
  var prefactureFull = encodeURIComponent(place);

  var uri = `${doorkeeperHost}/events?q=${prefacture}&sort=starts_at`;
  var options = {
    method: 'GET',
    uri,
    json: true,
    headers: {
      'User-Agent': 'Near-me',
      'Authentication': `Bearer ${doorkeeperToken}`
    }
  };
  return rp(options)
    .then((data) => {
      data = data.map((data) => {
        /* This part should be included on dataWash */
        data.event.lng = data.event.long;
        data.event.event_url = data.event.public_url;
        return data.event
      });
      return { doorkeeper: data };
    })
}

// function dataWash() {

// }

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});