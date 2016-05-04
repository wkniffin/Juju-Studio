if (Meteor.settings.AWS) {
  AWS.config.update({
    accessKeyId: Meteor.settings.AWS.accessKeyId,
    secretAccessKey: Meteor.settings.AWS.secretAccessKey
  });
} else {
  console.warn("AWS settings missing");
}
s3 = new AWS.S3();
// var s3 = new AWS.S3();
// var Future = Npm.require('fibers/future');
//
// var keys = Sounds.find({}, {fields: {_id: 1}}).fetch();
// //console.log(keys);
//
// keys.forEach(function(key) {
//   var params = {
//     Bucket: 'juju-sound',
//     Key: key._id+'.aac'
//   };
//
//   var futureGetObject = Future.wrap(s3.getObject.bind(s3));
//   var data = futureGetObject(params).wait();
//
//   var soundId = SoundBuffers.insert({soundId: key._id, buffer: data.Body});
//   //console.log(soundId);

// });
