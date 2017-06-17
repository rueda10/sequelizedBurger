var express = require("express");
var db = require("../models");
var _ = require('underscore');

var router = express.Router();

router.get("/", function(req, res) {
  // get request to '/' renders to selected entry to index.handlebars
  db.burger.findAll({}).then(function(burgers) {
    var hbsObject = {
      burgers: burgers
    }
    res.render("index", hbsObject);
  });

});

router.post("/", function(req, res) {
  // post request to '/' inserts entry to table and redirects to '/'
  db.burger.create(req.body).then(function(dbBurger) {
    res.redirect("/");
  }, function(e) {
    res.redirect(404, "/");
  });
});

router.put("/:id", function(req, res) {
  var burgerId = parseInt(req.params.id, 10);
  var body = _.pick(req.body, 'devoured');
  var attributes = {};

  if (body.hasOwnProperty('devoured')) {
    attributes.devoured = body.devoured;
  }

  db.burger.findById(burgerId).then(function(burger) {
    if (burger) {
      burger.update(attributes).then(function(burger) {
        res.redirect("/");
      }, function(e) {
        res.redirect(404, "/");
      });
    } else {
      res.redirect(404, "/");
    }
  }, function() {
    res.redirect(500, "/");
  });
});

module.exports = router;