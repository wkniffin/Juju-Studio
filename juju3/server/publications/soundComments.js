Meteor.publish('soundComments', function(soundId) {
  return Sounds.find({
    _id: soundId
  }, {
    fields: {'comments': 1}
  });
});
