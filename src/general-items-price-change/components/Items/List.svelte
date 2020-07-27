<script lang="ts">
  import items from '../../stores/items';
  import calcParams from '../../stores/calc-params';

  import ItemRow from './Item.svelte';
  import TristateCheckbox from './TristateCheckbox.svelte';

  // All state ==================================

  let checked: boolean;
  let indeterminate: boolean;

  function updateCheckstate(): void {
    indeterminate = !items.isIndeterminateChecksate();
    if (!indeterminate) {
      checked = $items[0].checked;
    }
  }

  updateCheckstate();
  items.subscribe(updateCheckstate);

  function changeAllCheckstate(checked: boolean): void {
    items.setAllCheckstate(checked);
  }

  $: changeAllCheckstate(checked);

  // One state ==================================

  function onItemCheckstate({ detail }: CustomEvent): void {
    const { checked, pos }: { checked: boolean; pos: number } = detail;

    items.update((items) =>
      items.map((item) => {
        if (item.pos === pos) {
          item.checked = checked;
        }
        return item;
      })
    );
  }
</script>

<table class="c-items table table-striped">
  <thead>
    <tr>
      <th class="c-item__check">
        <TristateCheckbox bind:checked bind:indeterminate />
      </th>
      <th class="c-item__title">Тур</th>
      <th
        class="c-item__price--init is-first"
        class:is-highlight="{$calcParams.priceKey === 'initial_price'}"
      >
        <small>
          Исходная
          <br />
          цена
        </small>
      </th>
      <th
        class="c-item__price is-first"
        class:is-highlight="{$calcParams.priceKey === 'price'}"
      >
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
      <ItemRow
        isLast="{index === $items.length - 1}"
        item="{item}"
        on:item:checkstate="{onItemCheckstate}"
      />
    {/each}
  </tbody>
</table>
