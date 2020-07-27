import { writable, get } from 'svelte/store';
import type Item from '../Item';

function isIndeterminateChecksate(items: Item[]): boolean {
  if (items.length > 1) {
    const checked = items[0].checked;
    return items.every((item) => item.checked === checked);
  }
  return true;
}

const store = (function () {
  const { subscribe, set, update } = writable([] as Item[]);

  return {
    subscribe,
    set,
    update,
    isIndeterminateChecksate: () => isIndeterminateChecksate(get(store)),
    setAllCheckstate: (checked: boolean) =>
      update((items) =>
        items.map((item) => {
          item.checked = checked;
          return item;
        })
      )
  };
})();

export default store;
