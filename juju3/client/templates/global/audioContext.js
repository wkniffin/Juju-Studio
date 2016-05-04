var AudioContext = AudioContext || webkitAudioContext || mozAudioContext;
context = new AudioContext();

s3 = new AWS.S3();
