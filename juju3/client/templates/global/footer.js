Template.footer.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    contact: false,
    about: false,
    signup: false,
    menu: true,
    submit: false
  });
  this.autorun(() => {
    if(Session.get('markerOpened')) {
      this.state.set('menu', true);
      this.state.set('contact', false);
      this.state.set('about', false);
      this.state.set('signup', false);
      Session.set('markerOpened', false);
    }
  });
});
Template.footer.helpers({
  about: function() {
    const instance = Template.instance();
    return instance.state.get('about');
  },
  contact: function() {
    const instance = Template.instance();
    return instance.state.get('contact');
  },
  signup: function() {
    const instance = Template.instance();
    return instance.state.get('signup');
  },
  menu: function() {
    const instance = Template.instance();
    return instance.state.get('menu');
  },
  success: function() {
    const instance = Template.instance();
    return instance.state.get('submit');
  }
});
Template.footer.events({
  'click .js-about': function(event, instance) {
    Session.set('oldSoundId', Session.get('soundId'));
    Session.set('soundId', '');
    instance.state.set('menu', false);
    instance.state.set('contact', false);
    instance.state.set('signup', false);
    instance.state.set('about', true);
  },
  'click .js-contact': function(event, instance) {
    Session.set('oldSoundId', Session.get('soundId'));
    Session.set('soundId', '');
    instance.state.set('menu', false);
    instance.state.set('about', false);
    instance.state.set('signup', false);
    instance.state.set('contact', true);
  },
  'click .js-signup': function(event, instance) {
    Session.set('oldSoundId', Session.get('soundId'));
    Session.set('soundId', '');
    instance.state.set('menu', false);
    instance.state.set('about', false);
    instance.state.set('contact', false);
    instance.state.set('signup', true);
  },
  'submit #contactForm': function(event, instance) {
    event.preventDefault();
    Meteor.call('contactUs', event.target.email.value, event.target.message.value, function(error, result) {
      if(error) {
        alert('Could not send message!');
      } else {
        instance.state.set('submit', true);
        event.target.email.value = '';
        event.target.message.value = '';
      }
    });
    Meteor.setTimeout(function() {
      instance.state.set('submit', false);
    }, 3000);
  },
  'submit #signupForm': function(event, instance) {
    event.preventDefault();
    Meteor.call('createNewUser',
     event.target.firstname.value,
     event.target.lastname.value,
     event.target.username.value,
     event.target.email.value,
     event.target.password.value,
     function(error, result) {
      if(error) {
        alert(error.reason);
      } else {
        instance.state.set('submit', true);
        event.target.firstname.value = '';
        event.target.lastname.value = '';
        event.target.username.value = '';
        event.target.email.value = '';
        event.target.password.value = '';
      }
    });
    Meteor.setTimeout(function() {
      instance.state.set('submit', false);
    }, 3000);
  },
  'click .fa-undo': function(event, instance) {
    Session.set('soundId', Session.get('oldSoundId'));
    instance.state.set('about', false);
    instance.state.set('contact', false);
    instance.state.set('signup', false);
    instance.state.set('menu', true);
  }
});
