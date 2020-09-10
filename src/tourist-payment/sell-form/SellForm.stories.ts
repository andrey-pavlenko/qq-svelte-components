import SellFormComponent from './SellForm.svelte';

export default {
  title: 'Tourist Payment/Sell Form',
  component: SellFormComponent,
  argTypes: {
    amount: {
      defaultValue: 0,
      control: 'number'
    },
    client: {
      defaultValue: {
        name: 'Тестер',
        surname: 'Тестеров',
        phone: '79001112233',
        email: 'test@mail.ru'
      },
      control: 'object'
    }
  }
};

const Template = ({ onClick, ...args }) => ({
  Component: SellFormComponent,
  props: args,
  on: {
    click: onClick
  }
});

export const SellForm = Template.bind({});
