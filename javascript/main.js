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
  const $document = $(document);

  $document.on('click', '[data-action="create-todo-list"]', () => {
    todoListCollection.push({
      name: 'New List',
      items: []
    });
    updateUI();
  });

  $document.on('input', '[data-model="todo-list-name"]', function () {
    const $todoListName = $(this);
    const todoListId = getTodoListId($todoListName);
    todoListCollection[todoListId].name = $todoListName.text();
  });

  $document.on('click', '[data-action="create-todo-list-item"]', function () {
    const $createItemCta = $(this);
    const todoListId = getTodoListId($createItemCta);
    todoListCollection[todoListId].items.push({
      text: 'New item',
      checked: false
    });
    updateUI();
  });

  $document.on('click', '[data-action="remove-todo-list"]', function () {
    const $removeList = $(this);
    $removeList.parent('.todo-list').remove();
    updateUI();
  });

  // OnReview: Replace with the save button
  $document.on('click', '[data-model="save-json"]', function () {
    todoListCollection = JSON.parse($('[data-model="todo-list-collection-json"]').text());
    updateUI();
  });

  $document.on('change', '[data-model="rendering-engine"]', function () {
    renderingEngine = $(this).val();
    updateUI();
  });
};

$(() => {
  updateUI();
  attachEvents();
});