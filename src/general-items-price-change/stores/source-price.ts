import { writable } from 'svelte/store';

/**
 * values: price | initial_price
 */
const store = writable('price');

export default store;
