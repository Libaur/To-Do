const DEFAULT = "TO DO";

class Task {
  constructor(name, priority, status) {
    this.name = name;
    this.priority = priority;
    this.status = status;
  }
}

export class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  addTask(id, name, priority, status = DEFAULT) {
    const task = new Task(name, priority, status);
    this.tasks.set(id, task);
  }

  removeTask(id) {
    this.tasks.delete(id);
  }
}
