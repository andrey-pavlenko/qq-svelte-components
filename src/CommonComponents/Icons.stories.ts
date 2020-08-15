import IconsComponent from './Icons.svelte';

export default {
  title: 'Common/Icons',
  component: IconsComponent,
  argTypes: {
    iconFileUrl: {
      defaultValue: './img/icons.svg',
      control: 'text'
    },
    size: {
      defaultValue: 4,
      control: {
        type: 'range',
        min: 1,
        max: 16,
        step: 0.25
      }
    },
    color: {
      defaultValue: '#333333',
      control: 'color'
    }
  }
};

const Template = ({ onClick, ...args }) => ({
  Component: IconsComponent,
  props: args,
  on: {
    click: onClick
  }
});

export const Icons = Template.bind({});
