"use strict"
const PORT = process.env.PORT || 8080;

// Requiring Express and server dependencies
const express = require("express");
const ejs = require("ejs");
const methodOverride = require("method-override");

// Setting app to use express
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Start server
app.listen(PORT, process.env.IP, function(){
  console.log("Server has started and is running on port:", PORT);
});
