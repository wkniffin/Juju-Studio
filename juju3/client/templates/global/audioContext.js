// set the audio context for the map to play sounds and set the global s3 object on the client
var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
context = new AudioContext();

s3 = new AWS.S3();
