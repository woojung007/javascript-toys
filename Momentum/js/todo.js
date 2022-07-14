const toDoForm = document.getElementById("todo-form");
// const toDoInput = document.querySelector("#todo-form input");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const TODO_KEY = "TODO";

let toDos = [];

const saveTodDs = () => {
  localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
};

const deleteToDo = (event) => {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveTodDs();
};

const paintToDo = (newTodo) => {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❎";
  button.addEventListener("click", deleteToDo);

  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
};

const onClickToDoSubmit = (event) => {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveTodDs();
};

toDoForm.addEventListener("submit", onClickToDoSubmit);

const savedToDos = localStorage.getItem(TODO_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
