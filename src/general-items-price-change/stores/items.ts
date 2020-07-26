import { writable, get } from 'svelte/store';

// const checkable = writable([] as ItemCheckable[]);

const checkable = (function (items: ItemSource[]) {
  function itemsToCheckable(items: ItemSource[]): ItemCheckable[] {
    return items.map((item) => ({ ...item, ...{ checked: true } }));
  }

  const { subscribe, set, update } = writable(itemsToCheckable(items));

  return {
    subscribe,
    set,
    update,
    setSourceItems: (items: ItemSource[]) => {
      set(itemsToCheckable(items));
    }
  };
})([] as ItemSource[]);

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

const items = createStore();

export { checkable, items };
