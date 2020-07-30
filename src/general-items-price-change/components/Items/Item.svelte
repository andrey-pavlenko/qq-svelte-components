<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  import Item from '../../Item';
  import calcParams from '../../stores/calc-params';
  import type { updateArrayBindingPattern } from 'typescript';

  export let item: Item;
  export let isLast: boolean = false;

  $: newPrice = item.getNewPrice($calcParams);

  const dispatch = createEventDispatcher();

  function onCheckedChange(event: Event) {
    dispatch('item:checkstate', {
      checked: (event.target as HTMLInputElement).checked,
      pos: item.pos
    });
  }

  function useTransition(node: HTMLElement, calcParams: CalcParams) {
    return {
      async update(calcParams) {
        if (node.classList.contains('is-checked')) {
          node.classList.remove('is-checked');
          await tick();
          setTimeout(() => {
            node.classList.add('is-checked');
          }, 0);
        }
      }
    };
  }
</script>

<tr>
  <td class="c-item__check">
    <input
      type="checkbox"
      checked="{item.checked}"
      on:change="{onCheckedChange}"
    />
  </td>
  <td class="c-item__title">
    <div class="c-title__name" title="{item.name}">{item.name}</div>
    <div class="c-title__nights">{item.nightsStr}, с {item.checkinStr}</div>
  </td>
  <td
    class="c-item__price--init"
    class:is-last="{isLast}"
    class:is-highlight="{$calcParams.priceKey === 'initial_price'}"
  >
    {item.initialPriceStr}
  </td>
  <td
    class="c-item__price"
    class:is-last="{isLast}"
    class:is-highlight="{$calcParams.priceKey === 'price'}"
  >
    {item.priceStr}
  </td>
  <td
    class="c-item__price--new"
    class:is-checked="{item.checked}"
    class:has-error="{newPrice <= 0}"
    use:useTransition="{$calcParams}"
  >
    {Item.formatNumber(newPrice)}
  </td>
  <td class="c-item__currency">
    <small>{item.currency}</small>
  </td>
</tr>
