import { v1 } from "uuid";
import { beforeEach, expect, test } from "vitest";
import type { Todolist } from "../App";
import { deleteTodolistAC, createTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, todolistsReducer } from "./todolists-reducer";

// делаем стартовые данные, чтобы не захламлять сами тесты
let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

// перед каждым тестом будет запускаться функция beforeEach() и она будет сбрасывать стейт
beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
 
  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ]
})

test("correct todolist should be deleted", () => {
  // 1. Стартовый state, берем из функции beforeEach()

  // 2. Действие
  const action = deleteTodolistAC(todolistId1);
  const endState = todolistsReducer(startState, action);

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1);
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2);
});

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

test("correct todolist should be created", () => {
  const title = "New todolist";
  const endState = todolistsReducer(startState, createTodolistAC(title));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});

test('correct todolist should change its title', () => {
  const title = 'New title'
  const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todolistId2, title}))
 
  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
  const filter = 'completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todolistId2, filter}))
 
  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(filter)
})