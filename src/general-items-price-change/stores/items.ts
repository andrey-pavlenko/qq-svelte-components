import { writable } from 'svelte/store';

const store = writable([] as ItemCheckable[]);

export default store;
