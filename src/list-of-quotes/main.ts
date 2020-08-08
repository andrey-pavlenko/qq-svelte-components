import './index.sass';
import Application from './Application.svelte';

const target = document.querySelector('main');

new Application({
  target
});
