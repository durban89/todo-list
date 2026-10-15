import type { TodoFilter } from '@/utils/todos';

interface TodoFiltersProps {
  filter: TodoFilter;
  activeCount: number;
  completedCount: number;
  onChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

const FILTERS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export function TodoFilters({
  filter,
  activeCount,
  completedCount,
  onChange,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 px-1 pt-3 text-xs text-slate-500">
      <span>{activeCount} left</span>

      <div className="flex items-center gap-1">
        {FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-md px-2 py-1 font-medium transition ${
              filter === option.value
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="rounded-md px-2 py-1 font-medium transition hover:bg-slate-100 hover:text-slate-700 disabled:invisible"
      >
        Clear
      </button>
    </div>
  );
}
