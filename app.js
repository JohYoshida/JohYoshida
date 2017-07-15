"use strict"
const PORT           = process.env.PORT || 8080;

// Requiring Express and server dependencies
const express        = require("express");
const ejs            = require("ejs");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const methodOverride = require("method-override");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const Entry          = require("./models/entry");
const User           = require("./models/user");

// Defining app routes
const indexRoutes  = require("./routes/index");
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

// Configuring Passport
app.use(require("express-session")({
  secret: "secret keyphrase",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configuring passport-local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Setting current user
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // res.locals.message = req.flash("error");
  next();
});




// Setting app to use routes defined above
app.use ("/", indexRoutes);
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

// Start server
app.listen(PORT, process.env.IP, function(){
  console.log("Server has started and is running on port:", PORT);
});
