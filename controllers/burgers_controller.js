var express = require("express");
var db = require("../models");
var _ = require('underscore');

var router = express.Router();

router.get("/", function(req, res) {
  // get request to '/' renders to selected entry to index.handlebars
  db.burger.findAll({ include: [ db.user ] }).then(function(burgers) {
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
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  // put request to '/:id' updates the burger entry with devoured set to true and assigns
  // userId
  var burgerId = parseInt(req.params.id, 10);
  var userBody = _.pick(req.body, 'user_name');
  var burgerBody = _.pick(req.body, 'devoured');
  var attributes = {};

  if (userBody.user_name !== '') {
    db.user.create(userBody).then(function (dbUser) {
      if (burgerBody.hasOwnProperty('devoured')) {
        attributes.devoured = burgerBody.devoured;
      }

      attributes.userId = dbUser.id;

      db.burger.findById(burgerId).then(function (burger) {
        if (burger) {
          burger.update(attributes).then(function (burger) {
            res.redirect("/");
          }, function (e) {
            res.redirect(404, "/");
          });
        } else {
          res.redirect("/");
        }
      }, function () {
        res.redirect(500, "/");
      });
    }, function (e) {
      res.redirect(404, "/");
    });
  }

});

module.exports = router;