Meteor.methods({
  createNewUser: function(first, last, username, email, password) {
    var userId = Accounts.createUser({
      username: username,
      email: email,
      password: password
    });
    Meteor.users.update({_id: userId}, {
      $set: {name: {
        'first': first,
        'last': last
      }}
    });
    var text = 'Hello '+ first + '!\nWelcome to Juju Studio. Download the app for your iPhone on the app store and login with your email and newly created password!\nThanks for joining us in the sound revolution.\n-Jenn';
    Email.send({
      from: 'jenn@juju-studio.meteorapp.com',
      to: email,
      subject: 'Welcome to Juju Studio!',
      text: text
    });
  }
});
