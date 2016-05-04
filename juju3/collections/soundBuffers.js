SoundBuffers = new Mongo.Collection('SoundBuffers');

SoundBuffers.deny({
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
