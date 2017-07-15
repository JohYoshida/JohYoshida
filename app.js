"use strict"
const PORT           = process.env.PORT || 8080;

// Requiring Express and server dependencies
const express        = require("express");
const ejs            = require("ejs");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const Entry          = require("./models/entry");

// Defining app routes
const journalRoutes  = require("./routes/journal");

// Setting app to use express
const app            = express();

// Configuring app
app.set("view engine", "ejs");

// Telling Express to use the /public folder as default route
app.use(express.static(__dirname + "/public"));

// Configuring middleware
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

// Setting app to use routes defined above
app.use ("/journal", journalRoutes);

// Connecting Mongoose to test
mongoose.connect('mongodb://localhost/test');

// Open Mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongoose connected successfully!");
});

// ROUTES

// Index
app.get("/", function(req, res){
  res.render("landing");
});

// Start server
app.listen(PORT, process.env.IP, function(){
  console.log("Server has started and is running on port:", PORT);
});
