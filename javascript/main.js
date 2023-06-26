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
    const dataAction = target.getAttribute('data-action');
    
    if (dataAction === 'remove-todo-list') {
      event.preventDefault();
      const closestTodoList = target.closest('div.todo-list');
      if (closestTodoList) {
        closestTodoList.remove();
        updateUI();
      } else {
        console.log('No todo list element found');
      }
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

$(() => {
  updateUI();
  attachEvents();
});