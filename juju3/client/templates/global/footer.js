Template.footer.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    contact: false,
    about: false,
    menu: true,
    submit: false
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
    instance.state.set('menu', false);
    instance.state.set('contact', false);
    instance.state.set('about', true);
  },
  'click .js-contact': function(event, instance) {
    instance.state.set('menu', false);
    instance.state.set('about', false);
    instance.state.set('contact', true);
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
  'click .fa-undo': function(event, instance) {
    instance.state.set('about', false);
    instance.state.set('contact', false);
    instance.state.set('menu', true);
  }
});
