// This code only runs on the server
Meteor.publish('example', function () {
  return Example.find();
});
