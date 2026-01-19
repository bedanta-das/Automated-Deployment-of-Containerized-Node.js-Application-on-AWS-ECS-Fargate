// src/app.js
// Clean & fresh Todo List app (Docker-safe, no nested template literals)

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aesthetic Todo</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <style>body { font-family: 'Inter', sans-serif; }</style>
</head>
<body class="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center">

<div class="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-6 w-full max-w-md">
  <h1 class="text-3xl font-semibold text-gray-800 text-center mb-4">✨ Todo List</h1>

  <div class="flex gap-2 mb-4">
    <input id="todoInput" type="text" placeholder="Add a new task..." class="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-400" />
    <button onclick="addTodo()" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl">Add</button>
  </div>

  <ul id="todoList" class="space-y-2"></ul>
</div>

<script>
async function fetchTodos() {
  const res = await fetch('/todos');
  const data = await res.json();
  const list = document.getElementById('todoList');
  list.innerHTML = '';

  data.forEach(function(todo, index) {
    const li = document.createElement('li');
    li.className = 'flex justify-between items-center bg-white rounded-xl px-4 py-2 shadow';

    li.innerHTML =
      '<span class="' + (todo.done ? 'line-through text-gray-400' : 'text-gray-700') + '">' +
      todo.text +
      '</span>' +
      '<div class="flex gap-2">' +
      '<button onclick="toggleTodo(' + index + ')" class="text-sm px-2 py-1 rounded-lg bg-green-200">✓</button>' +
      '<button onclick="deleteTodo(' + index + ')" class="text-sm px-2 py-1 rounded-lg bg-red-200">✕</button>' +
      '</div>';

    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  if (!input.value.trim()) return;

  await fetch('/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: input.value })
  });

  input.value = '';
  fetchTodos();
}

async function toggleTodo(index) {
  await fetch('/todos/' + index, { method: 'PUT' });
  fetchTodos();
}

async function deleteTodo(index) {
  await fetch('/todos/' + index, { method: 'DELETE' });
  fetchTodos();
}

fetchTodos();
</script>

</body>
</html>`);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  todos.push({ text: req.body.text, done: false });
  res.json({ success: true });
});

app.put('/todos/:index', (req, res) => {
  const i = req.params.index;
  if (todos[i]) todos[i].done = !todos[i].done;
  res.json({ success: true });
});

app.delete('/todos/:index', (req, res) => {
  todos.splice(req.params.index, 1);
  res.json({ success: true });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('Todo app running at http://localhost:' + PORT);
});