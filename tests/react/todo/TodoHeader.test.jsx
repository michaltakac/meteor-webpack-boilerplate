import expect from 'expect';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

import TodoHeader from '../../../react/todo/TodoHeader';

describe('TodoHeader', () => {
  afterEach(() => {
    Meteor.resetCallTraces();
    Meteor.resetSubscriptionTraces();
    Meteor.setMockUser(null);
  });

  it('should display the incomplete count', () => {
    const todoHeader = TestUtils.renderIntoDocument(
      <TodoHeader
          hideCompleted={false}
          toggleHideCompleted={() => null}
          incompleteCount={123456789}
      />
    );

    const todoHeaderEl = React.findDOMNode(todoHeader);

    expect(todoHeaderEl.querySelector('h1').innerText).toContain('(123456789)');
  });

  it('should trigger the toggleHideCompleted when the checkbox change', function(done) {
    const todoHeader = TestUtils.renderIntoDocument(
      <TodoHeader
          hideCompleted={false}
          toggleHideCompleted={(e) => {
            expect(e.target.checked).toBe(true);
            done();
          }}
          incompleteCount={1}
      />
    );

    const todoHeaderEl = React.findDOMNode(todoHeader);
    const checkboxEl = todoHeaderEl.querySelector('input[type="checkbox"]');

    TestUtils.Simulate.change(checkboxEl, { target: { checked: true } });
  });

  it('should hide the new task form when not logged in', () => {
    const todoHeader = TestUtils.renderIntoDocument(
      <TodoHeader
          hideCompleted={false}
          toggleHideCompleted={() => null}
          incompleteCount={1}
      />
    );

    const todoHeaderEl = React.findDOMNode(todoHeader);

    expect(todoHeaderEl.querySelector('form')).toNotExist();
  });

  it('should display the new task form when logged in', () => {
    Meteor.setMockUser({ _id: 1 });

    const todoHeader = TestUtils.renderIntoDocument(
      <TodoHeader
          hideCompleted={false}
          toggleHideCompleted={() => null}
          incompleteCount={1}
      />
    );

    const todoHeaderEl = React.findDOMNode(todoHeader);

    expect(todoHeaderEl.querySelector('form')).toExist();
  });

  it('should add a new task when the form submitted ', () => {
    Meteor.setMockUser({ _id: 1 });

    const todoHeader = TestUtils.renderIntoDocument(
      <TodoHeader
          hideCompleted={false}
          toggleHideCompleted={() => null}
          incompleteCount={1}
      />
    );

    const todoHeaderEl = React.findDOMNode(todoHeader);
    const formEl = todoHeaderEl.querySelector('form');
    const inputEl = todoHeaderEl.querySelector('input[type="text"]')

    inputEl.value = 'This is a new task';
    TestUtils.Simulate.submit(formEl);

    const addTaskTrace = Meteor.getCallTraces('addTask');

    // addTask should be called with the new task
    expect(addTaskTrace.length).toBe(1);
    expect(addTaskTrace[0].length).toBe(1);
    expect(addTaskTrace[0][0]).toBe('This is a new task');

    // The previous value should be cleared
    expect(inputEl.value.length).toBe(0);
  });
});
