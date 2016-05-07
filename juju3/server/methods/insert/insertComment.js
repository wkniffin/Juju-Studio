// Method to add a comment to the corresponding sound. Added to an array of comments
Meteor.methods({
  insertComment: function(comment, id) {
    Sounds.upsert({_id: id}, {
      $push: {comments: comment}
    });
  }
});
