import storage from './storage.js';
import render from './render.js';
import { getTodoListId } from './ui-helpers.js';

let renderingEngine;
let todoListCollection = storage.getData();

/**
 * Updates browsers storage and re-renders To-Do lists using selected template engine
 */
const updateUI = () => {
  storage.updateData(todoListCollection);
  render(todoListCollection, '#todo-list-collection-container', renderingEngine);
};

/**
 * Adds events to DOM elements
 */
const attachEvents = () => {

  document.addEventListener('click', function (event) {
    const target = event.target;
    const dataAction = target.getAttribute('data-action');
    if (dataAction === 'create-todo-list') {
      todoListCollection.push({
        name: 'New List',
        items: []
      });
      updateUI();
    }
  });

  document.addEventListener('input', function(event) {
    const target = event.target;
    const dataModel = target.getAttribute('data-model');
    
    if (dataModel === 'todo-list-name') {
      const todoListName = target.textContent;
      const todoListId = getTodoListId(target);
      todoListCollection[todoListId].name = todoListName;
    }
  });

  document.addEventListener('click', function(event) {
    const target = event.target;
    const dataAction = target.getAttribute('data-action');
  
    if (dataAction === 'create-todo-list-item') {
      const createItemCta = target;
      const todoListId = getTodoListId(createItemCta);
      todoListCollection[todoListId].items.push({
        text: 'New item',
        checked: false
      });
      updateUI();
    }
  });

  document.addEventListener('click', function(event) {
    const target = event.target;
    let prevSibling = target.previousElementSibling;
    const dataAction = target.getAttribute('data-action');
    if (dataAction === 'remove-todo-list') {
      const closestTodoList = target.closest('.todo-list');
      const todoListId = getTodoListId(prevSibling);
      if (closestTodoList) {
        todoListCollection.splice(todoListId, 1);
        updateUI();
      } else {
        console.log('No todo list element found');
      }
    }
  });

  document.addEventListener('click', function (event) {
    const target = event.target;
    const closestTodoList = target.closest('div.todo-list');
    const todoListIdElement = closestTodoList.querySelector('[data-todo-list-id]');
    const dataAction = target.getAttribute('data-action');
    if (dataAction === 'remove-todo-list-item') {
      const todoListId = getTodoListId(todoListIdElement);
      const itemId = target.dataset.todoListItemId;
      todoListCollection[todoListId].items.splice(itemId, 1);
      updateUI();
    }
  });

  document.addEventListener('click', function (event) {
    const target = event.target;
    const dataModel = target.getAttribute('data-model');

    if (dataModel === 'save-json') {
      const todoListCollectionJsonElement = document.querySelector('[data-model="todo-list-collection-json"]');
      todoListCollection = JSON.parse(todoListCollectionJsonElement.innerText);
      updateUI();
    }
  });

  document.addEventListener('change', function (event) {
    const target = event.target;
    const dataModel = target.getAttribute('data-model');

    if (dataModel === 'rendering-engine') {
      renderingEngine = event.target.value;
      updateUI();
    }
  });
};

document.addEventListener('readystatechange', () => {
  updateUI();
  attachEvents();
});