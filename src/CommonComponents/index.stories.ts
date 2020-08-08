import { withKnobs, text } from '@storybook/addon-knobs';
import Icons from '../CommonComponents/Icons.svelte';

export default { title: 'Common', decorators: [withKnobs] };

export const icons: () => unknown = () => ({
  Component: Icons,
  props: {
    iconFileUrl: text('iconFileUrl', './img/icons.svg'),
    width: text('width', '4em'),
    height: text('height', '4em')
  }
});
