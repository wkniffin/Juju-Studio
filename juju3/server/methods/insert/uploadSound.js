Meteor.methods({
  uploadSound: function(sound) {
    if(this.userId) {
      var new_time = new Date();
      var the_sound = _.extend(sound, {
        date_uploaded: new_time,
      });
      var soundId = Sounds.insert(the_sound);
      var url = 'https://s3.amazonaws.com/juju-sound/'+soundId+'.aac';
      Sounds.update(soundId, {$set: {url: url}});
      return soundId;
    } else {
      throw new Meteor.Error('Not authorized','You must be logged in!');
    }
  }
});
