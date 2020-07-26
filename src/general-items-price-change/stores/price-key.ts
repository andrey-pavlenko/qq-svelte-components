import { writable } from 'svelte/store';

const store = writable('price' as PriceKeys);

export default store;
