"use strict"
const PORT           = process.env.PORT || 8080;

// Requiring Express and server dependencies
const express        = require("express");
const ejs            = require("ejs");
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
// const methodOverride = require("method-override");
const Entry          = require("./models/entry");

// Setting app to use express
const app            = express();

// Requiring routes
const journalRoutes = require("./routes/journal");
app.use ("/journal", journalRoutes);

mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));

// Entry.create(
//     {
//       name: "Granite Hill",
//       image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
//       text: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
//     }, function(err, entry){
//     if (err){
//       console.log(err);
//     } else {
//       console.log("NEW ENTRY");
//       console.log(entry);
//     }
//   });

// Open Mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongoose connected successfully!")
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
