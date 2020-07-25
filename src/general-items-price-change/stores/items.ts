import { writable } from 'svelte/store';

const store = writable([] as Item[]);

export default store;
