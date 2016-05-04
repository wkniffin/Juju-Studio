Template.comments.onCreated(function() {
  this.autorun(() => {
    this.subscribe('soundComments', Session.get('soundId'));
  });
});

Template.comments.helpers({
  soundSelected: function() {
    return !!Session.get('soundId');
  }
});
Template.comments.events({
  'submit #addComment': function(event, template) {
    event.preventDefault();
    var comment = {
      name: event.target.name.value,
      comment: event.target.comment.value
    };
    Meteor.call('insertComment', comment, Session.get('soundId'));
    event.target.comment.value = '';
    event.target.name.value = '';
    Session.set('newComment', true);
  }
});
