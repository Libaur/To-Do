const sections = {
  hp: document.querySelector("#high-priority"),
  lp: document.querySelector("#low-priority"),
};

const forms = {
  hp: document.querySelector("#hp-form"),
  lp: document.querySelector("#lp-form"),
};

const inputs = {
  hp: document.querySelector("#hp-input"),
  lp: document.querySelector("#lp-input"),
};

const errorOutput = document.querySelector("#error-output");

const clearUI = () =>
  document
    .querySelectorAll(".task-wrapper")
    .forEach((element) => element.remove());

const updateStorage = (tasks) =>
  localStorage.setItem("currentTasks", JSON.stringify([...tasks]));

const createElement = (element) => document.createElement(element);

function buildBlockOfElements(
  div,
  selectPriority,
  optionHigh,
  optionLow,
  selectStatus,
  optionToDo,
  optionInProgress,
  optionDone,
  span
) {
  div.setAttribute("class", "task-wrapper");
  selectPriority.setAttribute("class", "priority");
  optionHigh.setAttribute("value", "HIGH");
  optionLow.setAttribute("value", "LOW");
  selectStatus.setAttribute("class", "status");
  optionToDo.setAttribute("value", "TO DO");
  optionInProgress.setAttribute("value", "IN PROGRESS");
  optionDone.setAttribute("value", "DONE");
  span.setAttribute("class", "lnr lnr-cross");
  optionHigh.textContent = "HIGH";
  optionLow.textContent = "LOW";
  optionToDo.textContent = "TO DO";
  optionInProgress.textContent = "IN PROGRESS";
  optionDone.textContent = "DONE";

  const newBlock = div;

  div.append(selectPriority, selectStatus, span);
  selectPriority.append(optionHigh, optionLow);
  selectStatus.append(optionToDo, optionInProgress, optionDone);

  return newBlock;
}

function createStructureOfTask(id, name, priority, status) {
  const DIV = createElement("div");
  const SELECT_PRIORITY = createElement("select");
  const OPTION_HIGH = createElement("option");
  const OPTION_LOW = createElement("option");
  const SELECT_STATUS = createElement("select");
  const OPTION_TO_DO = createElement("option");
  const OPTION_IN_PROGRESS = createElement("option");
  const OPTION_DONE = createElement("option");
  const SPAN = createElement("span");
  DIV.textContent = name;
  DIV.id = id;
  const structureOfTask = buildBlockOfElements(
    DIV,
    SELECT_PRIORITY,
    OPTION_HIGH,
    OPTION_LOW,
    SELECT_STATUS,
    OPTION_TO_DO,
    OPTION_IN_PROGRESS,
    OPTION_DONE,
    SPAN
  );
  structureOfTask.querySelector(".priority").value = priority;
  structureOfTask.querySelector(".status").value = status;
  return structureOfTask;
}

export {
  sections,
  forms,
  inputs,
  errorOutput,
  clearUI,
  updateStorage,
  createStructureOfTask,
};
