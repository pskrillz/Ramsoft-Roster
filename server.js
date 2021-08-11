const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
var hsts = require('hsts');
const path = require('path');
var xssFilter = require('x-xss-protection');
var nosniff = require('dont-sniff-mimetype');
const request = require('request');
const { body, check, validationResult } = require('express-validator');
const { validateLocaleAndSetLanguage } = require('typescript');

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

// Add member with validation
  app.post('/api/addMember', [
    check('firstName').isString(),
    check('firstName').isLength({
        min: 4
    }),
    check('lastName').isString(),
        check('lastName').isLength({
        min: 4
    }),
    check('jobTitle').isString(),
        check('jobTitle').isLength({
        min: 4
    }),
    check('team').isString(),
        check('team').isLength({
        min: 4
    }),
    check('status').custom((value)=>{
      if(value === 'Active' || value === 'Inactive' ){
        return true
      } else {
        return false
      }
    }),
        check('status').isLength({
        min: 4
    }),
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors:errors.array()})
    }
    request.post('http://localhost:3000/members', {json: req.body}, (err, response, body) => {
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

//Update Member with validation
app.patch('/api/updateMember/:id', 
[
    check('firstName').isString(),
    check('firstName').isLength({
        min: 2
    }),
    check('lastName').isString(),
        check('lastName').isLength({
        min: 2
    }),
    check('jobTitle').isString(),
        check('jobTitle').isLength({
        min: 4
    }),
    check('team').isString(),
        check('team').isLength({
        min: 4
    }),
    check('status').custom((value)=>{
      if(value === 'Active' || value === 'Inactive' ){
        return true
      } else {
        return false
      }
    }),
        check('status').isLength({
        min: 4
    }),
  ], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(422).json({errors:errors.array()})
    }
    request.patch(`http://localhost:3000/members/${req.params.id}`, {json: req.body}, (err, response, body) => {
      if (response.statusCode <= 500) {
        res.send(response);
      }
    });
})





app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/softrams-racing/index.html'));
});

app.listen('8000', () => {
  console.log('Vrrrum Vrrrum! Server starting!');
});
