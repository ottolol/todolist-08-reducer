// Задача функции-reducer - изменять state на основе action:

import { v1 } from "uuid";
import { FilterValues, Todolist } from "../App";

// Тип для DeleteTodolistActionType будет тот, который возвращает нам функция - deleteTodolistAC()
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>;
export type CreateTodolistActionType = ReturnType<typeof createTodolistAC>;
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>;

// создали отдельный тип, чтобы не загромождать параметры функции todolistsReducer(action: ActionType)
type ActionType = DeleteTodolistActionType | CreateTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  todolists: Todolist[],
  action: ActionType
): Todolist[] => {
  switch (action.type) {
    case "delete_todolist":
      return todolists.filter((todolist) => todolist.id !== action.payload.id);
    case "create_todolist":
      const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
      return (
        [...todolists, newTodolist]
      );
    case "change_todolist_title":
      return (todolists.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist));
    case "change_todolist_filter":
      return (todolists.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist));
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

export const createTodolistAC = (title: string) => {
  return {
    type: "create_todolist",
    payload: {
      title: title,
      id: v1()
    },
  } as const;
};

export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
  return {
    type: "change_todolist_title",
    payload
  } as const;
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
  return {
    type: "change_todolist_filter",
    payload
  } as const;
}