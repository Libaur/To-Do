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

const setAttributesAndContent = (element, attributes, content) => {
  Object.keys(attributes).forEach((key) =>
    element.setAttribute(key, attributes[key])
  );
  if (content) element.textContent = content;
};

const createElementWithAttributes = (tag, attributes) => {
  const element = document.createElement(tag);
  setAttributesAndContent(element, attributes);
  return element;
};

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
  setAttributesAndContent(div, { class: "task-wrapper" });
  setAttributesAndContent(selectPriority, { class: "priority" });
  setAttributesAndContent(optionHigh, { value: "HIGH" }, "HIGH");
  setAttributesAndContent(optionLow, { value: "LOW" }, "LOW");
  setAttributesAndContent(selectStatus, { class: "status" });
  setAttributesAndContent(optionToDo, { value: "TO DO" }, "TO DO");
  setAttributesAndContent(
    optionInProgress,
    { value: "IN PROGRESS" },
    "IN PROGRESS"
  );
  setAttributesAndContent(optionDone, { value: "DONE" }, "DONE");
  setAttributesAndContent(span, { class: "lnr lnr-cross" });

  div.append(selectPriority, selectStatus, span);
  selectPriority.append(optionHigh, optionLow);
  selectStatus.append(optionToDo, optionInProgress, optionDone);

  return div;
}

function createStructureOfTask(id, name, priority, status) {
  const div = createElementWithAttributes("div", { id, textContent: name });
  const selectPriority = createElement("select");
  const optionHigh = createElement("option");
  const optionLow = createElement("option");
  const selectStatus = createElement("select");
  const optionToDo = createElement("option");
  const optionInProgress = createElement("option");
  const optionDone = createElement("option");
  const span = createElement("span");

  const structureOfTask = buildBlockOfElements(
    div,
    selectPriority,
    optionHigh,
    optionLow,
    selectStatus,
    optionToDo,
    optionInProgress,
    optionDone,
    span
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
