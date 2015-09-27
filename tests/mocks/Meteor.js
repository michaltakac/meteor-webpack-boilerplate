let _user = null;
let _callTraces = {};
let _subscriptionTraces = {};

function startup(func) {
  func();
}

function call(name, ...args) {
  if (!_callTraces[name]) {
    _callTraces[name] = [];
  }

  _callTraces[name].push(args);
}

function subscribe(name, ...args) {
  if (!_subscriptionTraces[name]) {
    _subscriptionTraces[name] = [];
  }

  _subscriptionTraces[name].push(args);
}

function user() {
  return _user;
}

function userId() {
  return _user ? _user._id : null;
}

function setMockUser(user) {
  _user = user;
}

function resetCallTraces() {
  _callTraces = {};
}

function getCallTraces(name) {
  return _callTraces[name];
}

function resetSubscriptionTraces() {
  _subscriptionTraces = {};
}

function getSubscriptionTraces(name) {
  return _subscriptionTraces[name];
}

export default {
  startup,
  call,
  subscribe,
  user,
  userId,

  // Mock helpers
  setMockUser,
  resetCallTraces,
  getCallTraces,
  resetSubscriptionTraces,
  getSubscriptionTraces
};
