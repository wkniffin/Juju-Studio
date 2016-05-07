// Method for creating a user from the form on the client. Also sends an email to the new user
// parameters: as written
Meteor.methods({
  createNewUser: function(first, last, username, email, password) {
    // we don't need a valid user here as there is no login on web client, only mobile
    // use the accounts password createUser method
    const userId = Accounts.createUser({
      username: username,
      email: email,
      password: password
    });
    // update the newly created user with a new field called "name" instead of using the profile field
    Meteor.users.update({_id: userId}, {
      $set: {name: {
        'first': first,
        'last': last
      }}
    });

    // email the new user with the welcome email
    const text = 'Hello '+ first + '!\nThanks for signing up for Juju Studio! \nWe hope you enjoy our web app and continue to tap into the sounds that are hidden all around you. Our mobile app is currently in alpha testing. \nIf you would like to know more information, please contact jpmaynar@uvm.edu.\nThanks!';
    Email.send({
      from: 'jpmaynar@uvm.edu',
      to: email,
      bcc: 'jpmaynar@uvm.edu',
      subject: 'Welcome to Juju Studio!',
      text: text
    });
  }
});
