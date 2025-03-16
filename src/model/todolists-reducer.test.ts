import { v1 } from "uuid";
import { expect, test } from "vitest";
import type { Todolist } from "../App";
import { deleteTodolistAC, todolistsReducer } from "./todolists-reducer";

test("correct todolist should be deleted", () => {
  const todolistId1 = v1();
  const todolistId2 = v1();

  // 1. Стартовый state
  const startState: Todolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

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
  const todolistId1 = v1();
  const todolistId2 = v1();

  const startState: Todolist[] = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];

  const title = "New todolist";
  const endState = todolistsReducer(startState, createTodolistAC(title));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(title);
});
