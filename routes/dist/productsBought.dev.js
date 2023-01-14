"use strict";

var mysql = require('mysql2');

var router = require('express').Router();

var db = mysql.createConnection({
  host: 'localhost',
  user: "angerfist",
  password: "9662@#$%&",
  database: 'blog'
});
router.post("/", function (req, res) {
  var user = req.body.user.username;
  var list = [];
  req.body.list.map(function (a) {
    list.push(a.id);
  });
  console.log(user);
  console.log(list);
  db.connect(function (err) {
    if (err) throw err;
    console.log("connected to db...");
  });

  try {
    list.forEach(function (a) {
      db.query("insert into blog.purchased (username_id,product_id) values(\"".concat(user, "\",\"").concat(a, "\")"), function (err, res) {
        if (err) throw err;
      });
    });
  } catch (err) {
    console.log("something went wrong");
  } finally {
    db.close(function (err) {
      if (err) {
        throw err;
      }

      ;
    });
    console.log("finished updating from db and safely exiting....");
  }
});
router.get("/user", function (req, res) {
  var a = JSON.parse(JSON.stringify(req.body.user));
  console.log(a);
  db.connect(function (err) {
    if (err) throw err;
    console.log("connected to db...");
  });

  try {
    var lis = db.query("select product_id from blog.purchased where username_id=\"".concat(a, "\""));
    console.log(lis);
    console.log(res.json(lis));
  } catch (err) {
    console.log("something went wrong");
  } finally {
    db.close(function (err) {
      if (err) throw err;
    });
    console.log("finished selecting from db and safely exiting....");
  }
});
module.exports = router;
//# sourceMappingURL=productsBought.dev.js.map
