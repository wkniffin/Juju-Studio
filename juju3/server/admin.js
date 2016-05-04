let administrators = [
  {
    name: { first: 'Will', last: 'Kniffin' },
    username: 'will',
    email: 'wdkniffin@gmail.com',
    password: 'pass'
  }
];

let generateAccounts = () => {
  _createUsers( administrators );
};

let _createUsers = ( users ) => {
  for ( let i = 0; i < users.length; i++ ) {
    let user       = users[ i ],
        userExists = _checkIfUserExists( user.email );

    if ( !userExists ) {
      _createUser( user );
    }
  }
};

let _checkIfUserExists = ( email ) => {
  return Meteor.users.findOne( { 'emails.address': email } );
};

let _createUser = ( user ) => {
  Accounts.createUser({
    email: user.email,
    username: user.username,
    password: user.password,
    profile: {
      name: user.name
    }
  });
};

Meteor.startup( () => {
  generateAccounts();
});
