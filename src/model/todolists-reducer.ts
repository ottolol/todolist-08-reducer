// Задача функции-reducer - изменять state на основе action:

import { Todolist } from "../App";

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;

export const todolistsReducer = (
  todolists: Todolist[],
  action: DeleteTodolistActionType
): Todolist[] => {
  switch (action.type) {
    case "delete_todolist":
      return todolists.filter((todolist) => todolist.id !== action.payload.id);
    default:
      return todolists;
  }
};

export const deleteTodolistAC = (id: string) => {
  return {
    type: "delete_todolist",
    payload: {
      id: id,
    },
  } as const;
};
