import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/tailwind.css';
import { TodoApp } from '@/components/TodoApp';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="h-full overflow-y-auto">
      <TodoApp className="w-full" />
    </div>
  </StrictMode>,
);
