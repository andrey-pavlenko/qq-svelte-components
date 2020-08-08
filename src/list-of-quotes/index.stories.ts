import Button from './Button.svelte';

export default { title: 'MyButton' };

export const withText = () => ({
  Component: Button,
  pros: {
    text: 'Some text'
  }
});
