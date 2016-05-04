Meteor.methods({
  contactUs: function(email, message) {
    Email.send({
      from: email,
      to: 'wdkniffin@gmail.com',
      subject: 'Message from ' + email + ' about Juju Studio',
      text: message
    });
  }
});
