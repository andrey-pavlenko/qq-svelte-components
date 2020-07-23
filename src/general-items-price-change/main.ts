import './styles/index.sass';
import Application from './Application.svelte';

const app = new Application({
  target: document.querySelector('main')
});

export default app;
