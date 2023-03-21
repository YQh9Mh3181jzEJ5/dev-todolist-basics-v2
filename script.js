const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => {
    add(todo);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  add();
});

function add(todo) {
  let todoText = input.value;
  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const li = document.createElement("li");
    li.innerText = todoText;
    li.classList.add("list-group-item");

    if (todo && todo.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      li.remove();
      saveData();
    });

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      saveData();
    });

    ul.appendChild(li);
    input.value = "";
    saveData();
  }
}

function saveData() {
  const lists = document.querySelectorAll("li");
  let todos = [];
  lists.forEach((list) => {
    let todo = {
      text: list.innerText,
      completed: list.classList.contains("completed"),
    };
    todos.push(todo);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
