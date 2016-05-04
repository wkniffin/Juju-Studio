Meteor.method('getAllSounds', function() {
  return Sounds.find().fetch();
}, {
  httpMethod: 'get'
});
