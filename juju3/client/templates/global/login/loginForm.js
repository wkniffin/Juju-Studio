Template.loginForm.events({
  'submit #login': function(event, template) {
    event.preventDefault();
    var loginUser = event.target.username.value;
    var loginPassword = event.target.password.value;
    Meteor.loginWithPassword(loginUser, loginPassword, function(error) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
