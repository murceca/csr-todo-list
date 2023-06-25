/**
 * Retrieves To-Do list's unique indentifier for given HTML element.
 * @param {HTMLElement} $element HTML element inside To-Do list.
 * @returns {Number} The unique indentifier of the To-Do list.
 */
const getTodoListId = ($element) => {
  return parseInt($element.data('todo-list-id'));
};

/**
 * 
 * @param {*} 
 */
const initHandlebarsHelpers = () => {
  Handlebars.registerHelper('arrayLength', function (array) {
    return array.length;
  });
  Handlebars.registerHelper('toJSON', function(object) {
    return JSON.stringify(object, null, 2);
  });
};

export {
  getTodoListId,
  initHandlebarsHelpers
};