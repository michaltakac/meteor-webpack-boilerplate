import expect from 'expect';
import React from 'react/addons';

const TestUtils = React.addons.TestUtils;

import TodoList from '../../../react/todo/TodoList';
import TodoItem from '../../../react/todo/TodoItem';

const testingTasks = [
  { _id: 1, owner: 1, checked: true, username: 'test', text: 'Testing task 1' },
  { _id: 2, owner: 1, checked: false, username: 'test', text: 'Testing task 2' },
  { _id: 3, owner: 1, checked: false, username: 'test', text: 'Testing task 3' },
  { _id: 4, owner: 1, checked: false, username: 'test', text: 'Testing task 4' }
];

describe('TodoList', () => {
  afterEach(() => {
    Meteor.resetCallTraces();
    Meteor.resetSubscriptionTraces();
    Meteor.setMockUser(null);
  });

  it('should list all tasks', () => {
    const todoList = TestUtils.renderIntoDocument(
      <TodoList
          hideCompleted={false}
          tasks={testingTasks}
      />
    );

    const items = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);
    expect(items.length).toBe(testingTasks.length);
  });
});
