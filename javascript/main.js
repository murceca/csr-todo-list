import render from '/javascript/render.js';
import { getTodoListId } from '/javascript/ui-helpers.js';

let todoListCollection = [{
    "name": "Shopping list",
    "items": [{
      "text": "White shirt",
      "checked": true
    },
    {
      "text": "Buy wide hat",
      "checked": false
    }]
  },
  {
    "name": "Grocery store",
    "items": [{
      "text": "Buy 2 bottles of milk",
      "checked": false
    },
    {
      "text": "Eggs",
      "checked": false
    }]
  },
  {
    "name": "Plan for Wednesday",
    "items": [{
      "text": "English lesson",
      "checked": false
    }]
  },
  {
    "name": "Home",
    "items": []
  }
];
let renderingEngine;

const updateUI = () => {
  render(todoListCollection, '#todo-list-collection-container', renderingEngine);
};

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