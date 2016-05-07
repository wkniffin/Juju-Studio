// Method to get all sounds for the iOS client via a GET using the simple-rest package
// All fields returned
Meteor.method('getAllSounds', function() {
  return Sounds.find().fetch();
}, {
  httpMethod: 'get'
});
