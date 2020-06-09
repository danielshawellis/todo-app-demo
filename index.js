/*===============================================================
GLOBAL STATE
===============================================================*/
let applicationState = {
  listIdCounter: 0,
  todoIdCounter: 0
}


/*===============================================================
HELPER FUNCTIONS
===============================================================*/
function getNextListId() {
  applicationState.listIdCounter ++;
  return applicationState.listIdCounter;
}

function getNextTodoId() {
  applicationState.todoIdCounter ++;
  return applicationState.todoIdCounter;
}


/*===============================================================
CLICK HANDLERS
===============================================================*/
function handleAddListClick() {
  // Set up variables
  let listId = getNextListId();

  // Call function to add new list
  addList( listId );
}

function handleAddTodoClick( clickedElement ) {
  // Set up variables
  let todoId = getNextTodoId();
  let listId = clickedElement.getAttribute( 'data-list-id' );
  let todoContent = document.querySelectorAll(`[data-list-id="${ listId }"]`)[0].getElementsByClassName( 'new-todo-content-input' )[0].value;

  // Call function to add new todo
  addTodo( todoId, listId, todoContent );
}

function handleRemoveTodoClick( clickedElement ) {
  // Set up variables
  let todoId = clickedElement.getAttribute( 'data-todo-id' );

  // Call function to remove todo
  removeTodo( todoId );
}


/*===============================================================
MAIN FUNCTIONS
===============================================================*/
function addList( listId ) {
  // Set up variables
  let listsContainer = document.getElementById( 'lists-container' );
  let listTemplate = document.createElement('div');

  // Template new list
  listTemplate.innerHTML =
    `<div class="list" data-list-id="${ listId }">
      <input class="new-todo-content-input" type="text"></input><button onClick="handleAddTodoClick(this)" data-list-id="${ listId }">Add New Todo</button>
      <div class="todos-container">
        <!-- Todos will go here -->
      </div>
    </div>`
  ;

  // Add new list to the DOM within lists container
  listsContainer.append( listTemplate );

  // Add list in Firebase here
}

function addTodo( todoId, listId, todoContent ) {
  // Set up variables
  let targetList = document.querySelectorAll(`div.list[data-list-id="${ listId }"]`)[0];
  let targetTodosContainer = targetList.getElementsByClassName( 'todos-container' )[0];
  let todoTemplate = document.createElement('div');

  // Template new todo
  todoTemplate.innerHTML =
    `<div class="todo" data-todo-id="${ todoId }">
      <span class="todo-text">${ todoContent }</span><button onClick="handleRemoveTodoClick(this)" data-todo-id="${ todoId }">Remove</button>
    </div>`
  ;

  // Add new todo to the DOM within target container
  targetTodosContainer.append( todoTemplate );

  // Add todo in Firebase here
}

function removeTodo( todoId ) {
  // Set up variables
  let targetTodo = document.querySelectorAll(`div.todo[data-todo-id="${ todoId }"]`)[0];

  // Remove todo from DOM
  targetTodo.remove();

  // Remove todo in Firebase here
}
