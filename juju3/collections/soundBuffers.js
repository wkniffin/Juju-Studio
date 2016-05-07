// Store the actual sound data from s3
SoundBuffers = new Mongo.Collection('SoundBuffers');

// Deny all client privileges
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
