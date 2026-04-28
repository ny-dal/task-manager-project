/* Task Manager Project
Author: Lynda Nyota
Date: 04/22/2026

Filename: task_manager_project.js */


// Create array to store tasks and counter for each new task
let tasks = [];
let nextId = 1;

let form = document.getElementById("taskForm");
let taskmanager = document.getElementById("taskmanager");

// listen for submit event
form.addEventListener("submit", function(event) {
  
  // Prevent page from reloading on submission
  event.preventDefault();

  // Read values from form fields
  let taskName = document.getElementById("taskName").value;
  let priority = document.getElementById("priority").value;
  let important = document.getElementById("important").checked;
  let completed = document.getElementById("completed").checked;

  // Ensure that user entered a task name
  if (taskName === "") {
    alert("Please enter a task name.");
    return;
  }

  let today = new Date().toLocaleDateString();

  // Create task object
  let task = {
    id: nextId,
    name: taskName,
    priority: priority,
    isImportant: important,
    isCompleted: completed,
    date: today
  };

  // Add new task to tasks array
  tasks.push(task);
  nextId++;

  // Every time a task is added, updated, or deleted log full task in console
  console.log(JSON.stringify(tasks));

  // Clear form fields
  form.reset();
  displayTasks();
});

// Display new tasks
function displayTasks() {

  // Clear to avoid duplicates
  taskmanager.innerHTML = "";

  // Loop through each task in array
  for (let task of tasks) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";

    // Highlight important tasks in red
    if (task.isImportant) {
      taskDiv.style.color = "red";
    }
    
    // Apply a strikethrough to completed tasks
    if (task.isCompleted) {
      taskDiv.style.textDecoration = "line-through";
    }
    // Add a border depending of task priority
    if (task.priority === "High") {
      taskDiv.style.border = "3px solid red";
    } else if (task.priority === "Medium") {
      taskDiv.style.border = "2px solid blue";
    } else {
      taskDiv.style.border = "2px solid black";
    }
    // Display tasks dynamically in the #taskmanager div using .innerHTML
    taskDiv.innerHTML = `
      <h3>${task.name}</h3>
      <p>Priority: ${task.priority}</p>
      <p>Important: ${task.isImportant}</p>
      <p>Completed: ${task.isCompleted}</p>
      <p>Date added: ${task.date}</p>
      <button onclick="toggleCompleted(${task.id})">${task.isCompleted ? "Undo" : "Mark as Complete"}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;

    taskmanager.appendChild(taskDiv);
  }
}

function toggleCompleted(id) {
  for (let task of tasks) {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
    }
  }

  // Log the updated task list to the console
  console.log(JSON.stringify(tasks));
  displayTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(function(task) {
    return task.id !== id;
  });

  console.log(JSON.stringify(tasks));
  displayTasks();
}
