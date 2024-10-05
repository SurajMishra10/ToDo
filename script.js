document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      addTaskToDOM(task);
    });
  };

  // Save tasks to local storage
  const saveTasks = () => {
    const tasks = [];
    document.querySelectorAll("li").forEach((li) => {
      const taskText = li.querySelector(".task-text").innerText;
      const taskCompleted = li.querySelector('input[type="checkbox"]').checked;
      tasks.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Add task to DOM
  const addTaskToDOM = (task) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>
            <input type="checkbox" class="checkbox" ${
              task.completed ? "checked" : ""
            }>
            <span class="task-text"
            >${task.text}</span>
            </span>
            <span class="control-btn">
            <button class="edit-task">Edit</button>
            <i class="fa-solid fa-trash delete-task"> </i>
            </span>
        `;

    taskList.appendChild(li);

    // Edit task
    li.querySelector(".edit-task").addEventListener("click", () => {
      const newText = prompt("Edit task:", task.text);
      if (newText) {
        li.querySelector(".task-text").innerText = newText;
        saveTasks();
      }
    });

    // Delete task
    li.querySelector(".delete-task").addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    // Mark task as completed
    li.querySelector('input[type="checkbox"]').addEventListener(
      "change",
      () => {
        saveTasks();
      }
    );
  };

  // Add new task
  addButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
      addTaskToDOM({ text: taskText, completed: false });
      taskInput.value = "";
      saveTasks();
    }
  });

  // Load tasks on page load
  loadTasks();
});
