/**
 * Shared todo types and persistent storage.
 */
import { storage } from '@wxt-dev/storage';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export const todosStorage = storage.defineItem<Todo[]>('local:todos', {
  fallback: [],
});

export function createTodo(text: string): Todo {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };
}

export function countActive(todos: Todo[]): number {
  return todos.reduce((count, todo) => count + (todo.completed ? 0 : 1), 0);
}
