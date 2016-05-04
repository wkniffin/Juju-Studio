Sounds = new Mongo.Collection('Sounds');

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
