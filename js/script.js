const todos = [];
const input = document.querySelector('#todo-input');
const noTodo = document.querySelector('#no-todo');
const submitButton = document.querySelector('#submit-todo');

const checkIfTodoExist = () => {
  console.log('Here');
  if (todos.length === 0) {
    noTodo.style.display = 'block';
  }
};

const deleteTodo = (e) => {
  const elem = e.target.previousElementSibling.previousElementSibling.textContent;
  const elemIndex = todos.findIndex(el => el === elem);

  todos.splice(elemIndex, 1);
  e.target.parentElement.style.display = 'none';
  checkIfTodoExist();
};

const render = () => {
  [].forEach.call(document.querySelectorAll('.list-todo'), (x) => {
    x.classList.add('no-display');
  });

  todos.forEach((x) => {
    const li = document.createElement('LI');
    li.classList += 'todo list-todo';
    li.innerHTML = `
      <p data-key=${todos.length - 1}>${x}</p>
      <span onclick="editTodo(event)" class="lnr lnr-pencil mr-12 p5"></span>
      <span onclick="deleteTodo(event)" class="lnr lnr-trash mr-12 p5"></span>
      `;

    document.querySelector('#todoList').append(li);
  });
};

const displayTodos = () => {
  if (noTodo) {
    noTodo.style.display = 'none';
  }

  const li = document.createElement('LI');
  li.classList += 'todo list-todo';
  li.innerHTML = `
  <p data-key=${todos.length - 1}>${input.value}</p>
  <span onclick="editTodo(event)" class="lnr lnr-pencil mr-12 p5"></span>
  <span onclick="deleteTodo(event)" class="lnr lnr-trash mr-12 p5"></span>
  `;

  document.querySelector('#todoList').append(li);
};

const editTodo = (e) => {
  e.preventDefault();
  document.querySelector('#update-todo').classList.remove('no-display');
  submitButton.setAttribute('disabled', 'disabled');
  submitButton.classList.add('btn-disabled');

  const elem = e.target.previousElementSibling;
  const elemIndex = todos.findIndex(el => el === elem.textContent);

  input.value = elem.textContent;
  input.focus();

  document.querySelector('#update-todo').addEventListener('click', (e) => {
    e.preventDefault();
    todos.forEach((el, i) => {
      if (el === elem.textContent && i === elemIndex) {
        todos.splice(i, 1, input.value);
        render();
        input.value = '';

        document.querySelector('#update-todo').classList.add('no-display');
        submitButton.removeAttribute('disabled', 'disabled');
        submitButton.classList.remove('btn-disabled');
      }
    });
  });
};

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (input.value === '') {
    document.querySelector('.invalid').style.visibility = 'visible';
    setTimeout(() => {
      document.querySelector('.invalid').style.visibility = 'hidden';
    }, 2000);
  } else {

    todos.push(input.value);
    displayTodos();
    input.value = '';
  }
});
