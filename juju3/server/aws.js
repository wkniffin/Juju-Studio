// set the default AWS settings and create an s3 global object via the aws-sdk package
if (Meteor.settings.AWS) {
  AWS.config.update({
    accessKeyId: Meteor.settings.AWS.accessKeyId,
    secretAccessKey: Meteor.settings.AWS.secretAccessKey
  });
} else {
  console.warn("AWS settings missing");
}
s3 = new AWS.S3();
