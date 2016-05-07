// create the default admin user
Meteor.startup(function() {
  const administrator = {
    name: { first: 'Will', last: 'Kniffin' },
    username: 'will',
    email: 'wdkniffin@gmail.com',
    password: 'pass'
  };

  // check if the admin user already exists
  if(!Meteor.users.findOne({'emails.address': administrator.email})) {
    Accounts.createUser({
      email: administrator.email,
      username: administrator.username,
      password: administrator.password,
      profile: {
        name: administrator.name
      }
    });
  }
});
