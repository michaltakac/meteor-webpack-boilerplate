global.React = require('react');
global.Meteor = require('./mocks/Meteor');
global.BlazeToReact = require('./mocks/BlazeToReact');
global.ReactMeteorData = {};

var context = require.context('./', true, /\.test\.jsx?$/);
context.keys().forEach(context);
