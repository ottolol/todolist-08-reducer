import { v1 } from 'uuid';
import type {TasksState} from '../App'
import { CreateTodolistActionType, DeleteTodolistActionType } from './todolists-reducer'
 
export type DeleteTaskActionType = ReturnType<typeof deleteTaskAC>;
export type CreateTaskActionType = ReturnType<typeof createTaskAC>;
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;

type Actions = DeleteTodolistActionType | CreateTodolistActionType | DeleteTaskActionType | CreateTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
 
export const tasksReducer = (tasks: TasksState, action: Actions): TasksState => {
  switch (action.type) {
    case 'delete_todolist': {
        delete tasks[action.payload.id]
        return({...tasks})
    }
    case 'create_todolist': {
        return {...tasks, [action.payload.id]: []}
    }
    case 'delete_task': {
      return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)}
    }
    case 'create_task': {
      const newTask = {id: action.id, title: action.payload.title, isDone: false}
      return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}
    }
    case 'change_task_status': {
      return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => task.id == action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
    }
    case 'change_task_title': {
      return {...tasks, [action.payload.todolistId]: tasks[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
    }
    default:
      return tasks
  }
}

export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
  return {
    type: 'delete_task',
    payload 
  } as const;
}
 
export const createTaskAC = (payload: {todolistId: string, title: string}) => {
  return {
    type: 'create_task',
    id: v1(),
    payload
  } as const;
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
  return {
    type: 'change_task_status',
    payload
  } as const;
}

export const changeTaskTitleAC =(payload: {todolistId: string, taskId: string, title: string}) => {
  return {
    type: 'change_task_title',
    payload
  } as const;
}