import { writable, get } from 'svelte/store';

function createStore(items: Item[] = []) {
  const { subscribe, set, update } = writable(items);

  function setChecked(items: Item[], checked: boolean): Item[] {
    return items.map((item) => ({ ...item, ...{ checked } }));
  }

  function isAllCheckedSimilar(items: Item[]): boolean {
    if (items.length > 1) {
      const checked = items[0].checked;
      return items.every((item) => item.checked === checked);
    }
    return true;
  }

  return {
    subscribe,
    set,
    update,
    setChecked: (checked) => update((items) => setChecked(items, checked)),
    isAllCheckedSimilar: () => isAllCheckedSimilar(get(store))
  };
}

const store = createStore();

export default store;
