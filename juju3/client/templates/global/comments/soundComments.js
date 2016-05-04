Template.soundComments.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    page: 0,
    length: 0
  });
});
Template.soundComments.helpers({
  comment: function() {
    const instance = Template.instance();
    var comments = Sounds.findOne({_id: Session.get('soundId')}, {fields: {'comments': 1}}).comments;
    if(comments) {
      instance.state.set('length', comments.length - 1);
    } else {      
      var defaultComment = {
        comment: 'Your comments here!',
        name: 'Example'
      };
      return defaultComment;
    }
    var page = '';
    if(Session.get('newComment')) {
      page = instance.state.get('length');
    } else {
      page = instance.state.get('page');
    }
    return comments[page];
  }
});
Template.soundComments.events({
  'click #js-page-left': function(event, instance) {
    event.preventDefault();
    Session.set('newComment', false);
    if(instance.state.get('page') > 0) {
      instance.state.set('page', instance.state.get('page') - 1);
    } else {
      instance.state.set('page', instance.state.get('length'));
    }
  },
  'click #js-page-right': function(event, instance) {
    event.preventDefault();
    Session.set('newComment', false);
    if(instance.state.get('page') < instance.state.get('length')) {
      instance.state.set('page', instance.state.get('page') + 1);
    } else {
      instance.state.set('page', 0);
    }
  }
});
