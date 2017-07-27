const Entry = require("../models/entry");

// all the middleware goes here
var middlewareObj = {}

middlewareObj.checkEntryOwnership = function checkEntryOwnership (req, res, next){
  if (req.isAuthenticated()){
    Entry.findById(req.params.id, function(err, foundEntry){
      if (err){
        res.redirect("back");
      } else {
        // does user own the entry?
        if(foundEntry.author.id.equals(req.user.id)){
          next();
        } else {
          res.redirect("back");
        }
      }
    });
  } else {
    res.redirect("back");
  }
};

middlewareObj.isLoggedIn = function isLoggedIn (req, res, next){
  if (req.isAuthenticated()){
    return next;
  }
  res.redirect("/login");
};

module.exports = middlewareObj;
