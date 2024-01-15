let todos = [];
const todoList = document.getElementById('todoList');
const todoForm = document.getElementById('todoForm');
const todoInput = todoForm.querySelector('input');

const addingToDoList = (payload) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    const span = document.createElement('span');

    btn.innerText = ' X';
    btn.addEventListener('click', deleteTodoList);
    span.innerText = payload;

    li.appendChild(btn);
    li.appendChild(span);

    const id = Date.now();
    li.id = id;
    li.classList.add('todo');
    todos.push({
        text: payload,
        id: id,
    });
    localStorage.setItem('todos', JSON.stringify(todos));
    todoList.appendChild(li);
};

const deleteTodoList = (event) => {
    event.preventDefault();
    console.dir('target id: ' + Number(event.target.parentNode.id));

    todos = todos.filter((element) => {
        return element.id !== Number(event.target.parentNode.id);
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    event.target.parentElement.remove();
};

const todoFormSubmit = (event) => {
    event.preventDefault();
    addingToDoList(todoInput.value);
    todoInput.value = '';
    todoInput.focus();
};

todoForm.addEventListener('submit', todoFormSubmit);
const savedToDOList = JSON.parse(localStorage.getItem('todos'));

if (savedToDOList) {
    savedToDOList.forEach((element) => {
        todos.push(element);
    });
    console.log(todos);
    todos.forEach((element) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        const span = document.createElement('span');
        //
        btn.innerText = ' X';
        btn.addEventListener('click', deleteTodoList);
        span.innerText = element.text;

        li.appendChild(btn);
        li.appendChild(span);

        li.id = element.id;
        li.classList.add('todo');
        todoList.appendChild(li);
        //
    });
}
