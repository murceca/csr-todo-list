/**
 * Retrieves To-Do list's unique indentifier for given HTML element.
 * @param {HTMLElement} $element HTML element inside To-Do list.
 * @returns {Number} The unique indentifier of the To-Do list.
 */
const getTodoListId = ($element) => {
  return parseInt($element.data('todo-list-id'));
};

export {
  getTodoListId
};