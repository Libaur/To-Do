import { TaskManager } from "./manager.js";
import {
  sections,
  forms,
  inputs,
  errorOutput,
  clearUI,
  updateStorage,
  createStructureOfTask,
} from "./dom.js";
import { checkTaskValidation, checkObtainFromStorage } from "./errors.js";
import { nanoid } from "nanoid";

const taskManager = new TaskManager();

function loadingActions() {
  const currentTasks = checkObtainFromStorage();
  currentTasks.forEach((task) => {
    const id = task[0];
    const name = task[1].name;
    const priority = task[1].priority;
    const status = task[1].status;
    taskManager.addTask(id, name, priority, status)
  });
  clearUI();
  addTaskToUI(taskManager.tasks);
}

function handlerTask(event) {
  event.preventDefault();
  const type = event.target === forms.hp ? "hp" : "lp";
  const priority = type === "hp" ? "HIGH" : "LOW";
  const name = inputs[type].value;
  const id = nanoid();
  try {
    checkTaskValidation(name);
    taskManager.addTask(id, name, priority);
    clearUI();
    addTaskToUI(taskManager.tasks);
    updateStorage(taskManager.tasks);
    inputs[type].value = null;
  } catch (error) {
    return (errorOutput.textContent = error.message);
  }
}

function addTaskToUI(tasks) {
  tasks.forEach((task, id) => {
    const name = task.name;
    const priority = task.priority;
    const status = task.status;
    const section = priority === "HIGH" ? sections.hp : sections.lp;
    const newTask = createStructureOfTask(id, name, priority, status);
    section.append(newTask);
    newTask.querySelector("span").addEventListener("click", deleteTask);
    newTask
      .querySelector("select")
      .addEventListener("change", changePriorityAndStatus);
    newTask
      .querySelector("select")
      .nextElementSibling.addEventListener("change", changePriorityAndStatus);
  });
}

function changePriorityAndStatus(event) {
  const select = event.target;
  const task = select.parentElement;
  const name = task.firstChild.nodeValue;
  if (select.classList.contains("priority")) {
    taskManager.addTask(task.id, name, select.value, select.nextSibling.value);
  } else {
    taskManager.addTask(
      task.id,
      name,
      select.previousSibling.value,
      select.value
    );
  }
  clearUI();
  addTaskToUI(taskManager.tasks);
  updateStorage(taskManager.tasks);
}

function deleteTask(event) {
  const span = event.target;
  const priority = span.previousSibling;
  const status = priority.previousSibling;
  const task = span.parentElement;
  priority.removeEventListener("change", changePriorityAndStatus);
  status.removeEventListener("change", changePriorityAndStatus);
  span.removeEventListener("click", deleteTask);
  taskManager.removeTask(task.id);
  clearUI();
  addTaskToUI(taskManager.tasks);
  updateStorage(taskManager.tasks);
}

document.addEventListener("DOMContentLoaded", loadingActions);
forms.hp.addEventListener("submit", handlerTask);
forms.lp.addEventListener("submit", handlerTask);
