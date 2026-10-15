import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { Todo } from '@/utils/todos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onRemove, onUpdate }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  function startEditing() {
    setDraft(todo.text);
    setEditing(true);
  }

  function commit() {
    setEditing(false);
    if (draft.trim() && draft !== todo.text) {
      onUpdate(todo.id, draft);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') commit();
    if (event.key === 'Escape') setEditing(false);
  }

  return (
    <li className="group flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50">
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition ${
          todo.completed
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-slate-300 text-transparent hover:border-indigo-400'
        }`}
      >
        <svg viewBox="0 0 20 20" fill="none" className="size-3.5">
          <path
            d="M4.5 10.5l3.5 3.5 7.5-8"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commit}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 rounded border border-indigo-300 px-2 py-1 text-sm outline-none ring-2 ring-indigo-100"
        />
      ) : (
        <span
          onDoubleClick={startEditing}
          className={`min-w-0 flex-1 cursor-default truncate text-sm ${
            todo.completed ? 'text-slate-400 line-through' : 'text-slate-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        aria-label="Delete todo"
        className="shrink-0 rounded-md p-1 text-slate-300 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
      >
        <svg viewBox="0 0 20 20" fill="none" className="size-4">
          <path
            d="M5.5 5.5l9 9m0-9l-9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  );
}
