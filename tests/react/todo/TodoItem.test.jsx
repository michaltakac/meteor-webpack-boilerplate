import expect from 'expect';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

import TodoItem from '../../../react/todo/TodoItem';

describe('TodoItem', () => {
  afterEach(() => {
    Meteor.resetCallTraces();
    Meteor.resetSubscriptionTraces();
    Meteor.setMockUser(null);
  });

  it('should start by the username and contain the task text', () => {
    const task = { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const taskText = todoItemEl.querySelector('.text').innerText;

    expect(taskText.indexOf(task.username)).toBe(0); // Start by the username
    expect(taskText.indexOf(task.text)).toBeGreaterThan(-1); // Contain the task text
  });

  it('should not display a toggle button if you are not the owner', () => {
    const task = { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    expect(todoItemEl.querySelector('.toggle-private')).toNotExist();
  });

  it('should display a public button if you own it and it is public', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const buttonText = todoItemEl.querySelector('.toggle-private').innerText;

    expect(buttonText).toBe('Public');
  });

  it('should display a private button if you own it and it is private', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, private: true, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const buttonText = todoItemEl.querySelector('.toggle-private').innerText;

    expect(buttonText).toBe('Private');
  });

  it('should display a visual cue the task is private', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, private: true, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    expect(todoItemEl.className).toContain('private');
  });

  it('should display a visual cue the task is completed', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, private: true, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    expect(todoItemEl.className).toContain('checked');
  });

  it('should toggle a private task public', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, private: true, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const buttonEl = todoItemEl.querySelector('.toggle-private');

    TestUtils.Simulate.click(buttonEl);

    const setPrivateTrace = Meteor.getCallTraces('setPrivate');

    // Toggle private off
    expect(setPrivateTrace.length).toBe(1);
    expect(setPrivateTrace[0].length).toBe(2);
    expect(setPrivateTrace[0][0]).toBe(task._id);
    expect(setPrivateTrace[0][1]).toBe(false);
  });

  it('should toggle a public task private', () => {
    Meteor.setMockUser({ _id: 1 });

    const task = { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const buttonEl = todoItemEl.querySelector('.toggle-private');

    TestUtils.Simulate.click(buttonEl);

    const setPrivateTrace = Meteor.getCallTraces('setPrivate');

    // Toggle private on
    expect(setPrivateTrace.length).toBe(1);
    expect(setPrivateTrace[0].length).toBe(2);
    expect(setPrivateTrace[0][0]).toBe(task._id);
    expect(setPrivateTrace[0][1]).toBe(true);
  });

  it('should toggle an uncompleted task completed', () => {
    const task = { _id: 1, owner: 1, checked: false, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const checkboxEl = todoItemEl.querySelector('.toggle-checked');

    TestUtils.Simulate.change(checkboxEl, { target: { checked: true } });

    const setCheckedTrace = Meteor.getCallTraces('setChecked');

    // Toggle private off
    expect(setCheckedTrace.length).toBe(1);
    expect(setCheckedTrace[0].length).toBe(2);
    expect(setCheckedTrace[0][0]).toBe(task._id);
    expect(setCheckedTrace[0][1]).toBe(true);
  });

  it('should toggle a completed task uncomplete', () => {
    const task = { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const checkboxEl = todoItemEl.querySelector('.toggle-checked');

    TestUtils.Simulate.change(checkboxEl, { target: { checked: false } });

    const setCheckedTrace = Meteor.getCallTraces('setChecked');

    // Toggle private off
    expect(setCheckedTrace.length).toBe(1);
    expect(setCheckedTrace[0].length).toBe(2);
    expect(setCheckedTrace[0][0]).toBe(task._id);
    expect(setCheckedTrace[0][1]).toBe(false);
  });

  it('should remove a task correctly', () => {
    const task = { _id: 1, owner: 1, checked: false, username: 'test', text: 'Testing task 1' };

    const todoItem = TestUtils.renderIntoDocument(
      <TodoItem task={task} />
    );

    const todoItemEl = React.findDOMNode(todoItem);
    const buttonEl = todoItemEl.querySelector('.delete');

    TestUtils.Simulate.click(buttonEl);

    const setPrivateTrace = Meteor.getCallTraces('deleteTask');

    // Toggle private on
    expect(setPrivateTrace.length).toBe(1);
    expect(setPrivateTrace[0].length).toBe(1);
    expect(setPrivateTrace[0][0]).toBe(task._id);
  });
});
