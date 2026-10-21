import { StrictMode, useCallback, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import '@/assets/tailwind.css';
import { TodoApp } from '@/components/TodoApp';

function PopupApp() {
  const [sidePanelSupported, setSidePanelSupported] = useState(false);
  const [panelTarget, setPanelTarget] = useState<
    { tabId: number } | { windowId: number } | null
  >(null);

  useEffect(() => {
    setSidePanelSupported(typeof browser.sidePanel?.open === 'function');

    void (async () => {
      const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
      if (tab?.id != null) {
        setPanelTarget({ tabId: tab.id });
        return;
      }
      const win = await browser.windows.getCurrent();
      if (win?.id != null) setPanelTarget({ windowId: win.id });
    })();
  }, []);

  // Must run synchronously inside the click handler, otherwise Chrome rejects
  // the call because the user gesture is already gone.
  const openSidePanel = useCallback(() => {
    if (!panelTarget) return;
    void browser.sidePanel.open(panelTarget);
  }, [panelTarget]);

  return (
    <TodoApp
      headerAction={
        sidePanelSupported ? (
          <button
            type="button"
            onClick={openSidePanel}
            title="Open in side panel"
            className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            Side panel
          </button>
        ) : null
      }
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PopupApp />
  </StrictMode>,
);
