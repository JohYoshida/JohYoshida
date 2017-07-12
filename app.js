"use strict"
const PORT           = process.env.PORT || 8080;

// Requiring Express and server dependencies
const express        = require("express");
const ejs            = require("ejs");
const bodyParser     = require("body-parser");
// const methodOverride = require("method-override");

// Setting app to use express
const app            = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.use(methodOverride("_method"));

var entries = [
  {name: "Entry 1", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", text: "Lorem to the ipsum"},
  {name: "Entry 2", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", text: "Lorem to the ipsum"},
  {name: "Entry 3", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg", text: "Lorem to the ipsum"}
];

// ROUTES

// Index
app.get("/", function(req, res){
  res.render("landing");
});

// Journal
app.get("/journal", function(req, res){
  res.render("journal", {entries: entries});
});

app.post("/journal", function(req, res){
  // get data from form and add to entries array
  var name = req.body.name;
  var image = req.body.image;
  var text = req.body.text;
  var newEntry = {name: name, image: image, text: text};
  entries.push(newEntry);
  // redirect back to journal page
  res.redirect("/journal");
});

app.get("/journal/new", function(req, res){
  res.render("new.ejs");
});

// Start server
app.listen(PORT, process.env.IP, function(){
  console.log("Server has started and is running on port:", PORT);
});
