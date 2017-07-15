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
  var title = req.body.title;
  var image = req.body.image;
  var text = req.body.text;
  var newEntry = {title: title, image: image, text: text};
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
  Entry.findById(req.params.id).populate("comments").exec(function(err, foundEntry){
      if (err){
        console.log(err);
      } else {
        // render show template with that entry
        res.render("journal/show", {entry: foundEntry});
      }
  });
});

// EDIT
router.get("/:id/edit", function(req, res){
  Entry.findById(req.params.id, function(err, foundEntry){
    if (err) {
      console.log(err);
      res.redirect("journal/:id");
    } else{
      res.render("journal/edit", {entry: foundEntry});
    }
  });
});

// UPDATE
router.put("/:id", function(req, res){
  // find and update the correct entry
  Entry.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedEntry){
    if (err){
      console.log(err)
      res.redirect("journal");
    } else {
      // return to show page
      res.redirect("journal/" + req.params.id);
    }
  });
});

module.exports = router;
