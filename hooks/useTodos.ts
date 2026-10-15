import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  countActive,
  createTodo,
  todosStorage,
  type Todo,
  type TodoFilter,
} from '@/utils/todos';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>('all');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    todosStorage.getValue().then((value) => {
      if (active) {
        setTodos(value);
        setLoaded(true);
      }
    });

    const unwatch = todosStorage.watch((value) => {
      if (value) setTodos(value);
    });

    return () => {
      active = false;
      unwatch();
    };
  }, []);

  const commit = useCallback((updater: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
      const next = updater(prev);
      void todosStorage.setValue(next);
      return next;
    });
  }, []);

  const addTodo = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      commit((prev) => [createTodo(text), ...prev]);
    },
    [commit],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      commit((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [commit],
  );

  const removeTodo = useCallback(
    (id: string) => {
      commit((prev) => prev.filter((todo) => todo.id !== id));
    },
    [commit],
  );

  const updateTodo = useCallback(
    (id: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      commit((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
      );
    },
    [commit],
  );

  const clearCompleted = useCallback(() => {
    commit((prev) => prev.filter((todo) => !todo.completed));
  }, [commit]);

  const filtered = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return {
    todos,
    filtered,
    filter,
    setFilter,
    loaded,
    activeCount: countActive(todos),
    completedCount: todos.length - countActive(todos),
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
  };
}
