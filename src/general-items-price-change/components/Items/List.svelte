<script lang="ts">
  import sourcePrice from '../../stores/source-price';
  import items from '../../stores/items';

  import ItemView from './Item.svelte';

  function onItemCheck({ detail }: CustomEvent): void {
    console.info('onItemCheck', detail);
  }

  // export let items: Item[] = [];

  // console.info(items);
  // console.info($sourcePrice);
</script>

<table
  class="c-items table table-striped"
  class:by-init="{$sourcePrice === 'initial_price'}"
  class:by-current="{$sourcePrice === 'price'}"
>
  <thead>
    <tr>
      <th class="c-item__check">
        <input type="checkbox" />
      </th>
      <th class="c-item__title">Тур</th>
      <th class="c-item__price--init is-first">
        <small>
          Исходная
          <br />
          цена
        </small>
      </th>
      <th class="c-item__price is-first">
        <small>
          Текущая
          <br />
          цена
        </small>
      </th>
      <th class="c-item__price--new">
        <small>
          Новая
          <br />
          цена
        </small>
      </th>
      <th class="c-item__currency">&nbsp;</th>
    </tr>
  </thead>
  <tbody>
    {#each $items as item, index (item.pos)}
      <ItemView
        {...item}
        isLast="{index === $items.length - 1}"
        on:item:check="{onItemCheck}"
      />
    {/each}

  </tbody>
</table>
