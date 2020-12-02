const availableRenderingOptions = {
  ejs: {
    name: 'EJS',
    file: './javascript/todo-list-collection.ejs.html',
    render: ejs.render
  },
  nunjucks: {
    name: 'Nunjucks',
    file: '../templates/todo-list-collection.nunjucks',
    render: nunjucks.renderString
  }
};

/**
 * Returns information about available rendering options, and about the active one.
 * @param {String} activeRenderingEngine The name of the active rendering engine (e.g. "ejs", "nunjucks", etc).
 * @returns {Array} Information about available rendering options, and about the active one.
 */
const collectRenderingOptionsInfo = (activeRenderingEngine) => {
  const info = [];
  for (let keyName in availableRenderingOptions) {
    const option = availableRenderingOptions[keyName];
    info.push({
      keyName,
      name: option.name,
      isActive: activeRenderingEngine === keyName
    });
  }
  return info;
};

/**
 * Renders the collection of the To-Do lists into the specified HTML container.
 * @param {Array} todoListCollection The collection of the To-Do lists.
 * @param {HTMLElement, String} container The HTML element, in which we should put all rendered To-Do lists.
 * @param {String} renderingEngine The name of the active rendering engine (e.g. "ejs", "nunjucks", etc).
 */
const render = (todoListCollection, container, renderingEngine='ejs') => {
  const activeRenderingOption = availableRenderingOptions[renderingEngine];
  $.get(activeRenderingOption.file, (template) => {
    const html = activeRenderingOption.render(template, {
      todoListCollection,
      template,
      renderingOptions: collectRenderingOptionsInfo(renderingEngine)
    });
    $(container).html(html);
  });
};

export default render;