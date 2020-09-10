import SellFormComponent from './SellForm1.svelte';
import './styles.sass';

export default {
  title: 'Tourist Payment/Sell Form 1',
  component: SellFormComponent,
  argTypes: {
    amount: {
      defaultValue: 0,
      control: 'number'
    },
    texts: {
      defaultValue: {
        contacts:
          'Оставьте ваши контактные данные, они будут переданы турагенту, и он свяжется с вами',
        payment:
          'После внесения предоплаты наш менеджер получит сообщение о блокировке суммы на Вашей карте и начнет бронирование тура.<br />Если менеджер забронирует тур сумма предоплаты будет списана с Вашей карты и Вы получите фискальный кассовый чек. Менеджер свяжется с Вами и договорится о получение оставшейся сумму оплаты и передаче документов.<br />Если, по каким-то причинам, бронирование тура невозможно, сумма предоплаты будет разблокированаи вернется на Вашу карту.',
        order:
          'Заявка ни к чему вас не обязывает и не является бронированием. Получив заявку, наш менеджер уточнит наличие тура и свяжется с вами.'
      },
      control: 'object'
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
