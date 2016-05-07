// Publication to get the comments for the corresponding sound
// parameters: soundId - the _id of the sound currently selected on the map
Meteor.publish('soundComments', function(soundId) {
  return Sounds.find({
    _id: soundId
  }, {
    fields: {'comments': 1}
  });
});
