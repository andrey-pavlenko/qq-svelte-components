import './styles/index.sass';
import Application from './Application.svelte';

const app = new Application({
  target: document.body,
  props: {
    name: 'world',
  },
});

export default app;
