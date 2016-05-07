// Method to send email from contact us form on web client
// paramets: email - the email address from the user, message - the email message to be sent
Meteor.methods({
  contactUs: function(email, message) {
    Email.send({
      from: email,
      to: 'jpmaynar@uvm.edu',
      subject: 'Message from ' + email + ' about Juju Studio',
      text: message
    });
  }
});
