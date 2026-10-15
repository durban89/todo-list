import { countActive, todosStorage } from '@/utils/todos';

export default defineBackground(() => {
  const updateBadge = async () => {
    const todos = await todosStorage.getValue();
    const active = countActive(todos);
    await browser.action.setBadgeBackgroundColor({ color: '#6366F1' });
    await browser.action.setBadgeText({ text: active > 0 ? String(active) : '' });
  };

  todosStorage.watch(() => {
    void updateBadge();
  });

  void updateBadge();
});
