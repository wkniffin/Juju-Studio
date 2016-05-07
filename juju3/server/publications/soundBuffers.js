// Publication to get the binary data from SoundBuffers on the map to play a sound
Meteor.publish('SoundBuffers', function() {
  return SoundBuffers.find({}, {
    fields: {
      'soundId': 1,
      'buffer': 1
    }
  });
});
