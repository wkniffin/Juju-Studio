// Publication to get all sounds from the Sounds collection for the map
Meteor.publish('Sounds', function() {
  return Sounds.find({}, {
    fields: {
      'lat': 1,
      'lng': 1,
      'name': 1,
      'user': 1,
      'comment': 1,
      'url': 1
    }
  });
});
