class ShortDescriptionError extends Error {
  constructor(message) {
    super(message);
    this.name = ShortDescriptionError;
  }
}

class LongDescriptionError extends Error {
  constructor(message) {
    super(message);
    this.name = LongDescriptionError;
  }
}

class EmptyStorageError extends Error {
  constructor(message) {
    super(message);
    this.name = EmptyStorageError;
  }
}

class ObtainCurrentTasksError extends Error {
  constructor(message) {
    super(message);
    this.name = ObtainCurrentTasksError;
  }
}

export const checkTaskValidation = (name) => {
  if (name.length < 3) {
    throw new ShortDescriptionError("Пожалуйста, добавьте информативности");
  } else if (name.length > 25) {
    throw new LongDescriptionError("Пожалуйста, опишите задачу лаконичнее");
  }
}

export const checkObtainFromStorage = () => {
  try {
    if (!localStorage.length) throw new EmptyStorageError("Список задач пуст");
    const currentTasks = JSON.parse(localStorage.getItem("currentTasks"));
    if (!currentTasks)
      throw new ObtainCurrentTasksError("Сохраненные задачи не были получены");
    return currentTasks;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};
