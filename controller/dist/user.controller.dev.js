"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var db = require('../db');

var shortid = require('shortid');

module.exports.index = function (req, res) {
  res.render('users/index', {
    users: db.get('users').value()
  });
};

module.exports.search = function (req, res) {
  var q = req.query.q;
  var theMatchedCase = db.get('users').value().filter(function (user) {
    return users.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('users/index', {
    users: theMatchedCase
  });
};

module.exports.getCreate = function (req, res) {
  res.render('users/create');
};

module.exports.getId = function (req, res) {
  var id = req.params.id;
  console.log(_typeof(id));
  var user = db.get('users').find({
    id: id
  }).value();
  res.render('users/view', {
    user: user
  });
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate(); //xac thuc

  var errs = [];

  if (!req.body.name) {
    errs.push('Name is require');
  }

  if (!req.body.phone) {
    errs.push('Phone is require');
  }

  if (errs.length) {
    res.render('users/create', {
      errs: errs
    });
    return;
  } // het code xac thuc


  db.get('users').push(req.body).write();
  res.redirect('/users');
};