const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');

const app = express();

app.use(cors());
app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable('x-powered-by');
app.use(xssFilter());
app.use(nosniff());
app.set('etag', false);
app.use(
  helmet({
    noCache: true
  })
);
app.use(
  hsts({
    maxAge: 15552000 // 180 days in seconds
  })
);

app.use(
  express.static(path.join(__dirname, 'dist/softrams-racing'), {
    etag: false
  })
);


// Get all members
app.get('/api/members', (req, res) => {
  request('http://localhost:3000/members', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});

// Get all teams
app.get('/api/teams', (req, res) => {
  request('http://localhost:3000/teams', (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(body);
    }
  });
});


// Add Member
app.post('/api/addMember', (req, res) => {
    request.post('http://localhost:3000/members', { json: req.body }, (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(response);
      }
    });
  });

//Delete Member
app.delete('/api/deleteMember/:id', (req, res) => {
  request.delete(`http://localhost:3000/members/${req.params.id}`, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(response)
    }
  });
});

//Update Member
app.patch('/api/updateMember/:id', (req, res) => {
  request.patch(`http://localhost:3000/members/${req.params.id}`, { json: req.body }, (err, response, body) => {
    if (response.statusCode <= 500) {
      res.send(response)
      // console.log("great")
      // TODO: FIXIT: shows 404 in terminal but response comes back 200 with just a empty bracket
      // better handling of error but at least it shows the code
    }
  });
});





app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
