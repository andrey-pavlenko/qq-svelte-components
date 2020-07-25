<script lang="ts">
  import ItemView from './Item.svelte';
  import TristateCheckbox from './TristateCheckbox.svelte';

  import sourcePrice from '../../stores/source-price';
  import items from '../../stores/items';

  // All items ==================================

  let checked: boolean;
  let indeterminate: boolean;

  function updateCheckstate(): void {
    indeterminate = !items.isAllCheckedSimilar();
    if (!indeterminate) {
      checked = $items[0].checked;
    }
  }

  updateCheckstate();
  items.subscribe(updateCheckstate);

  function changeAllCheckState(checked: boolean): void {
    items.setChecked(checked);
  }

  $: changeAllCheckState(checked);

  // One item ===================================

  function onItemCheck({ detail }: CustomEvent): void {
    const { checked, pos } = detail;

    items.update((items) =>
      items.map((item) => {
        if (item.pos === pos) {
          return { ...item, ...{ checked } };
        } else {
          return item;
        }
      })
    );
  }
</script>

<table
  class="c-items table table-striped"
  class:by-init="{$sourcePrice === 'initial_price'}"
  class:by-current="{$sourcePrice === 'price'}"
>
  <thead>
    <tr>
      <th class="c-item__check">
        <TristateCheckbox bind:checked bind:indeterminate />
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
