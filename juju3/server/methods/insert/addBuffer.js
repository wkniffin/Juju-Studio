// Method to get audio data from s3 then store it binary data in the SoundBuffers collection
// parameters: id - the _id of the sound's corresponding information in the Sounds collection
Meteor.methods({
  addBuffer:function(id) {
    // valid user required
    if(this.userId) {
      console.log(id);

      // the params necessary for s3.getObject
      const params = {
        Bucket: 'juju-sound',
        Key: id.soundId+'.aac'
      };

      // wrap the async s3.getObject function with Meteor.wrapAsync to give access to the
      // data received from the function call
      let data;
      const getS3Object = Meteor.wrapAsync(s3.getObject, s3);
      try {
        data = getS3Object(params); // successful response
      } catch (err) {
        console.log(err, err.stack); // an error occurred
      }

      SoundBuffers.insert({soundId: id.soundId, date: new Date(), buffer: data.Body});

      return 'Success!!';
    } else {
      throw new Meteor.Error('Not authorized','You must be logged in!');
    }
  }
});
