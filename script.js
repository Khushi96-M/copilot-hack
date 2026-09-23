const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const formMessage = document.querySelector("#form-message");

const tasks = [];

function updateTaskSummary() {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const taskWord = tasks.length === 1 ? "task" : "tasks";

  taskCount.textContent = `${tasks.length} ${taskWord}`;
  emptyState.hidden = tasks.length > 0;
  taskList.hidden = tasks.length === 0;

  if (tasks.length > 0) {
    taskCount.textContent += ` · ${completedTasks} completed`;
  }
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.classList.toggle("completed", task.completed);

    const taskLabel = document.createElement("label");
    taskLabel.className = "task-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Mark "${task.name}" as complete`);
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task.name;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete "${task.name}"`);
    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.indexOf(task);
      tasks.splice(taskIndex, 1);
      renderTasks();
    });

    taskLabel.append(checkbox, taskText);
    listItem.append(taskLabel, deleteButton);
    taskList.append(listItem);
  });

  updateTaskSummary();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const taskName = taskInput.value.trim();

  if (!taskName) {
    formMessage.textContent = "Please enter a task before adding it.";
    taskInput.focus();
    return;
  }

  tasks.push({ name: taskName, completed: false });
  formMessage.textContent = "";
  taskForm.reset();
  taskInput.focus();
  renderTasks();
});

renderTasks();
