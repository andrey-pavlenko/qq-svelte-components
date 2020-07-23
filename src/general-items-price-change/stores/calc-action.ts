import { writable, get } from 'svelte/store';
import sourcePrice from './source-price';

/**
 * values: discount | markup | revert
 * derived from source-price
 */

const store = writable('discount');

sourcePrice.subscribe((value) => {
  const action = get(store);

  if (value === 'price' && action === 'revert') {
    store.set('discount');
  }
});

export default store;
