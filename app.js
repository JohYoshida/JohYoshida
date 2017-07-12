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

mongoose.connect('mongodb://localhost/test');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));

Entry.create(
    {
      name: "Granite Hill",
      image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
      text: "This is a huge granite hill. No bathrooms. No water. Beautiful granite!"
    }, function(err, entry){
    if (err){
      console.log(err);
    } else {
      console.log("NEW ENTRY");
      console.log(entry);
    }
  });

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

// Journal
app.get("/journal", function(req, res){
  // Get all entries from DB
  Entry.find({}, function(err, allEntries){
    if (err){
      console.log(err);
    } else {
      res.render("journal", {entries: allEntries});
    }
  });
});

// CREATE
app.post("/journal", function(req, res){
  // get data from form and add to entries array
  var name = req.body.name;
  var image = req.body.image;
  var text = req.body.text;
  var newEntry = {name: name, image: image, text: text};
  // create new entry and save to entries DB
  Entry.create(newEntry, function(err, newlyCreated){
    if (err){
      console.log(err);
    } else {
      // redirect back to journal page
      res.redirect("/journal");
    }
  });
});

// NEW
app.get("/journal/new", function(req, res){
  res.render("new.ejs");
});

// SHOW
app.get("/journal/:id", function(req, res) {
  // find entry with the provided ID
  Entry.findByID(req.params.id).populate("comments").exec(function(err, foundEntry){
      if (err){
        console.log(err);
      } else {
        console.log(foundEntry);
        // render show template with that entry
        res.render("show", {entry: foundEntry});
      }
  });
});

// Start server
app.listen(PORT, process.env.IP, function(){
  console.log("Server has started and is running on port:", PORT);
});
