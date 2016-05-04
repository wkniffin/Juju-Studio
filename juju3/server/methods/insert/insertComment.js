Meteor.methods({
  insertComment: function(comment, id) {
    Sounds.upsert({_id: id}, {
      $push: {comments: comment}
    });
  }
});
