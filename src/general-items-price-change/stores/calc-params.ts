import { writable } from 'svelte/store';

const store = writable({
  action: 'discount',
  priceKey: 'price'
} as CalcParams);

export default store;
