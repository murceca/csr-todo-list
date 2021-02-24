const getData = () => {
  let todoListCollection;
  try {
    todoListCollection = localStorage.getItem('todoListCollection');
    if (todoListCollection) {
      todoListCollection = JSON.parse(todoListCollection);
    }
  } catch(error) {
    console.error(error);
  }

  if (!todoListCollection) {
    todoListCollection = [{
      name: 'Shopping list',
      items: [{
          text: 'White shirt',
          checked: true
      },
      {
      text: 'Buy wide hat',
      checked: false
      }]
    },
    {
      name: 'Grocery store',
      items: [{
        text: 'Buy 2 bottles of milk',
        checked: false
      },
      {
        text: 'Eggs',
        checked: false
      }]
    },
    {
      name: 'Plan for Wednesday',
      items: [{
        text: 'English lesson',
        checked: false
      }]
    },
    {
      name: 'Home',
      items: []
    }];
  }
  return todoListCollection;
};

const updateData = (todoListCollection) => {
  try {
    localStorage.setItem('todoListCollection', JSON.stringify(todoListCollection));
  } catch(error) {
    console.error(error);
  }
};

export default {
  getData,
  updateData
};