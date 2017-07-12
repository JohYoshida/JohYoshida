const express = require("express");
const router = express.Router();
const Entry = require("../models/entry");

// Journal
router.get("/", function(req, res){
  // Get all entries from DB
  Entry.find({}, function(err, allEntries){
    if (err){
      console.log(err);
    } else {
      res.render("journal/index", {entries: allEntries});
    }
  });
});

// CREATE
router.post("/", function(req, res){
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
router.get("/new", function(req, res){
  res.render("journal/new.ejs");
});

// SHOW
router.get("/:id", function(req, res) {
  // find entry with the provided ID
  Entry.findByID(req.params.id).populate("comments").exec(function(err, foundEntry){
      if (err){
        console.log(err);
      } else {
        console.log(foundEntry);
        // render show template with that entry
        res.render("journal/show", {entry: foundEntry});
      }
  });
});

module.exports = router;
