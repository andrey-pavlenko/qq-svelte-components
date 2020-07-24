import './index.sass';
import Application from './Application.svelte';

const target = document.querySelector('main');
const items = JSON.parse(target.dataset.items || '[]');
const discounts = JSON.parse(target.dataset.discounts || '[]');

const app = new Application({
  target,
  props: {
    items,
    discounts
  }
});

export default app;
