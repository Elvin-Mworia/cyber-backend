"use strict";

var express = require('express');

require("dotenv").config();

var app = express();

var cors = require('cors');

var db = require("./models");

var Sequelize = require("sequelize");

var postrouter = require("./routes/post");

var Auth = require("./routes/auth");

var Malware = require("./routes/malware");

var Vulns = require("./routes/vulns");

var products = require("./routes/resources");

var addproduct = require("./routes/products");

var productsB = require("./routes/productsBought");

var _require = require("./models"),
    Post = _require.Post;

var bcrypt = require("bcrypt");

var _require2 = require("./models"),
    Users = _require2.Users;

var _require3 = require("./models"),
    Products = _require3.Products;

var upload = require("./upload");

var uploadPost = require("./uploadPost");

var user = require("./routes/users");

var comments = require("./routes/Comments");

var mpesa = require("./routes/mpesasktpush");

var _require4 = require('.//routes/Authmiddleware'),
    accessToken = _require4.accessToken;

var logger = function logger(req, res, next) {
  console.log("incoming request");
  next();
};

var Allowed_origin = ['*'];
var corOption = {
  origin: Allowed_origin
};
app.use(cors(corOption));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(logger); //static files

app.use("/images/product", express["static"]("images/product"));
app.use("/images/post", express["static"]("images/post")); //routers

app.use("/posts", postrouter);
app.use("/auth", Auth);
app.use("/malware", Malware);
app.use("/vulns", Vulns);
app.use("/resources", products);
app.use("/user", user);
app.use('/addproduct', upload, addproduct);
app.use("/comments", comments);
app.use("/productBought", productsB);
app.use("/mpesa-online", mpesa);
app.use("/mpesa", accessToken);
var port = process.env.PORT;
db.sequelize.sync({
  logging: console.log,
  force: false
}).then(function () {
  console.log("Connection to the database established");
  app.listen(port, function () {
    console.log("running on port ".concat(port));
  });
})["catch"](function (err) {
  return console.log("Something went wrong ".concat(err));
});
//# sourceMappingURL=index.dev.js.map
