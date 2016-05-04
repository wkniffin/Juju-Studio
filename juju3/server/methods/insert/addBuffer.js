Meteor.methods({
  addBuffer:function(id) {
    if(this.userId) {
      console.log(id);
      //var s3 = new AWS.S3();
      var Future = Npm.require('fibers/future');

      //console.log(keys);
      var params = {
        Bucket: 'juju-sound',
        Key: id.soundId+'.aac'
      };

      var futureGetObject = Future.wrap(s3.getObject.bind(s3));
      var data = futureGetObject(params).wait();

      //console.log(file);

      //var futureGetUrl = Future.wrap(s3.getSignedUrl.bind(s3));
      //var url = futureGetUrl('getObject', params).wait();

      var soundId = SoundBuffers.insert({soundId: id.soundId, buffer: data.Body});

      //Sounds.update({_id: id.soundId}, {$set: {url: url}});

      return 'Success!!';
    } else {
      throw new Meteor.Error('Not authorized','You must be logged in!');
    }
  }
});
