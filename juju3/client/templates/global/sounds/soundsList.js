// Template.soundsList.onCreated(function() {
//   this.autorun(() => {
//     this.subscribe('Sounds');
//     this.subscribe('SoundBuffers');
//   });
// });
// Template.soundsList.helpers({
//   sounds: function() {
//     // console.log(Sounds.find().fetch());
//     return Sounds.find().fetch();
//   }
// });
// Template.soundsList.events({
//   'click .each-sound': function(event) {
//     event.preventDefault();
//     var the_id = event.target.classList[0];
//
//     var the_sound = SoundBuffers.findOne({soundId: the_id});
//     //console.log(the_sound);
//
//     var originalBuffer = the_sound.buffer;
//     var finalBuffer = new ArrayBuffer(originalBuffer.byteLength);
//     new Uint8Array(finalBuffer).set(new Uint8Array(originalBuffer));
//
//     var source = context.createBufferSource();
//
//     context.decodeAudioData(finalBuffer, function(buffer) {
//       source.buffer = buffer;
//       source.connect(context.destination);
//     });
//
//     source.start(0);
//
//     // Meteor.call('signedUrl', the_id, function(err, res) {
//     //   var a = new Audio(res);
//     //   a.play();
//     // });
//   },
//   'click .fa-download': function(event) {
//     event.preventDefault();
//     var the_id = event.target.classList[2];
//
//     var the_sound = Sounds.findOne(the_id);
//
//     var originalBuffer = the_sound.buffer;
//     var finalBuffer = new ArrayBuffer(originalBuffer.byteLength);
//     new Uint8Array(finalBuffer).set(new Uint8Array(originalBuffer));
//
//     var source = context.createBufferSource();
//
//     context.decodeAudioData(finalBuffer, function(buffer) {
//       source.buffer = buffer;
//       source.connect(context.destination);
//     });
//
//     var blob = new Blob(source.buffer, {type: 'audio/aac'});
//     // console.log(blob);
//
//     var reader = new FileReader();
//
//     //console.log(reader.readAsText(blob));
//     //console.log(reader.readAsArrayBuffer(blob));
//     // console.log(reader.readAsDataURL(blob));
//   }
// });
