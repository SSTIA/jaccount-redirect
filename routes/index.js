const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const https = require('https');

/* GET JAccount Authorize */
router.get('/oauth/authorize', function(req, res, next) {
  const query = querystring.stringify(req.query);
  res.redirect(`https://jaccount.sjtu.edu.cn/oauth2/authorize?${query}`);
});

/* POST JAccount Token */
router.post('/oauth/token', function(req, res, next) {
  const query = querystring.stringify(req.body);
  const options = {
    host: 'jaccount.sjtu.edu.cn',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': query.length,
    },
  };
  const _req = https.request(options, function(_res) {
    _res.setEncoding('utf8');
    _res.on('data', function(data) {
      res.send(data);
      console.info('data:', data);
    });
  });
  _req.on('error', (e) => {
    console.error(e);
  });
  _req.write(query);
  _req.end();
});

/* GET JAccount Logout */
router.get('/oauth/logout', function(req, res, next) {
  const query = querystring.stringify(req.query);
  res.redirect(`https://jaccount.sjtu.edu.cn/oauth2/logout?${query}`);
});

/* GET API */
router.get('/oauth/api/*', function(req, res, next) {
  const query = querystring.stringify(req.query);
  const url = req.url.substring('/oauth/api'.length);
  res.redirect(`https://api.sjtu.edu.cn${url}?${query}`);
});

/* POST API */
router.post('/oauth/api/*', function(req, res, next) {
  const query = querystring.stringify(req.body);
  const url = req.url.substring('/oauth/api'.length);
  const options = {
    host: 'api.sjtu.edu.cn',
    path: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': query.length,
    },
  };
  const _req = https.request(options, function(_res) {
    _res.setEncoding('utf8');
    _res.on('data', function(data) {
      res.send(data);
      console.info('data:', data);
    });
  });
  _req.on('error', (e) => {
    console.error(e);
  });
  _req.write(query);
  _req.end();
});

module.exports = router;
