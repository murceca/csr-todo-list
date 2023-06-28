import { initHandlebarsHelpers } from './ui-helpers.js';

const availableRenderingOptions = {
  ejs: {
    name: 'EJS',
    file: './templates/todo-list-collection.ejs',
    render: ejs.render
  },
  nunjucks: {
    name: 'Nunjucks',
    file: './templates/todo-list-collection.nunjucks',
    render: nunjucks.renderString
  },
  handlebars: {
    name: 'Handlebars',
    file: './templates/todo-list-collection.hbs',
    render: (templateString, data) => {
      initHandlebarsHelpers();
      const template = Handlebars.compile(templateString);
      return template(data);
    }
  }
};

/**
 * Returns information about available rendering options, and about the active one.
 * @param {string} activeRenderingEngine The name of the active rendering engine (e.g. "ejs", "nunjucks", etc).
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
 * @param {HTMLElement, string} container The HTML element, in which we should put all rendered To-Do lists.
 * @param {string} renderingEngine The name of the active rendering engine (e.g. "ejs", "nunjucks", etc).
 */
const render = (todoListCollection, container, renderingEngine='ejs') => {
  const activeRenderingOption = availableRenderingOptions[renderingEngine];
  fetch(activeRenderingOption.file)
    .then(async response => {
      if (response?.ok) {
        const template = await response.text();
        const html = activeRenderingOption.render(template, {
          todoListCollection,
          template,
          renderingOptions: collectRenderingOptionsInfo(renderingEngine)
        });
        document.querySelector(container).innerHTML = html;
      } else {
        console.error(`Can't fetch the "${activeRenderingOption.file}" template!`);
      }
    })
    .catch(error => {
      console.error(
        `Error during fetching the "${activeRenderingOption.file}" template: ${error}`
      );
  });
};

export default render;