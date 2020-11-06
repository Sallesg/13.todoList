//Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter')

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filter)

//Functions
function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault()

  //Todo DIV
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  //DIV > LI
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  todoDiv.appendChild(newTodo)

  // Todo > LOCALSTORAGE
  localTodosSave(todoInput.value)

  //Check BUTTON
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-btn')
  todoDiv.appendChild(completedButton)

  //Delete BUTTON
  const deleteButton = document.createElement('button')
  deleteButton.innerHTML = '<i class="far fa-minus-square"></i>'
  deleteButton.classList.add('delete-btn')
  todoDiv.appendChild(deleteButton)

  //Append to list
  todoList.appendChild(todoDiv)

  //Clear todo input value
  todoInput.value = ''
}

function deleteCheck(event) {
  const item = event.target

  //Delete Todo
  if (item.classList[0] === 'delete-btn') {
    const todo = item.parentElement
    todo.classList.add('fall')
    localStorageDelete(todo)
    todo.addEventListener('transitionend', function () {
      todo.remove()
    })
  }

  //Check Mark
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement
    todo.classList.toggle('completed')
  }
}

//FILTER TODO
function filter(event) {
  const todos = todoList.childNodes
  todos.forEach((todo) => {
    switch (event.target.value) {
      case 'all':
        todo.style.display = 'flex'
        break
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break
    }
  })
}

//LOCAL STORAGE
function localTodosSave(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)
  localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.array.forEach((todo) => {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)

    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="far fa-minus-square"></i>'
    deleteButton.classList.add('delete-btn')
    todoDiv.appendChild(deleteButton)

    todoList.appendChild(todoDiv)
  })
}

function localStorageDelete(todo) {
  let todos
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  const todoArray = todo.children[0].innerText
  todos.split(todos.indexOf(todoArray), 1)
}
