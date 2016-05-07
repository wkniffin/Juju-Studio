// Method to add sound to Sounds collection. Method is called via the simple-rest package
// via a POST from a iOS native app.
// parametes: sound - a JSON object with keys user, name, lat, lng, comment
// returns: the soundId used to call the addBuffer method
Meteor.methods({
  uploadSound: function(sound) {
    // must be a valid user to upload a sound
    if(this.userId) {
      // add the current time to the sound object
      var new_time = new Date();
      var the_sound = _.extend(sound, {
        date_uploaded: new_time,
      });
      var soundId = Sounds.insert(the_sound);
      // var url = 'https://s3.amazonaws.com/juju-sound/'+soundId+'.aac';
      // Sounds.update(soundId, {$set: {url: url}});
      return soundId;
    } else {
      throw new Meteor.Error('Not authorized','You must be logged in!');
    }
  }
});
