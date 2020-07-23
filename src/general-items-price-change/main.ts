import './index.sass';
import Application from './Application.svelte';

import * as itemsJson from './items.json';

const app = new Application({
  target: document.querySelector('main'),
  props: {
    // @ts-ignore
    items: itemsJson.default
  }
});

export default app;
