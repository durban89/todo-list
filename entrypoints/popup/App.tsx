import { TodoFilters } from '@/components/TodoFilters';
import { TodoInput } from '@/components/TodoInput';
import { TodoItem } from '@/components/TodoItem';
import { useTodos } from '@/hooks/useTodos';

const EMPTY_MESSAGE: Record<string, string> = {
  all: 'No todos yet. Add your first one above!',
  active: 'Nothing left to do. Enjoy your day!',
  completed: 'No completed todos yet.',
};

export function App() {
  const {
    filtered,
    filter,
    setFilter,
    loaded,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodo,
    clearCompleted,
  } = useTodos();

  return (
    <div className="w-[360px] bg-white p-4 font-sans text-slate-800">
      <header className="mb-4 flex items-baseline justify-between">
        <h1 className="text-lg font-semibold tracking-tight">Todo List</h1>
        <span className="text-xs text-slate-400">
          {activeCount === 0 ? 'All done' : `${activeCount} active`}
        </span>
      </header>

      <TodoInput onAdd={addTodo} />

      <div className="mt-3">
        {loaded && filtered.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-400">
            {EMPTY_MESSAGE[filter]}
          </p>
        ) : (
          <ul className="flex flex-col">
            {filtered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onRemove={removeTodo}
                onUpdate={updateTodo}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="mt-2">
        <TodoFilters
          filter={filter}
          activeCount={activeCount}
          completedCount={completedCount}
          onChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </div>
    </div>
  );
}
