import Button from './Button.svelte';

export default {
  title: 'Common/Button',
  component: Button
};

const Template = ({ onClick, ...args }) => ({
  Component: Button,
  props: args,
  on: {
    click: onClick
  }
});

export const Primary = Template.bind({});
Primary.args = {
  prinary: true,
  label: 'Button'
};
