// Collection to hold the information for each sound. Does not store actual sound data
Sounds = new Mongo.Collection('Sounds');

// Deny all client privileges
Sounds.deny({
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  insert: function() {
    return true;
  }
});
