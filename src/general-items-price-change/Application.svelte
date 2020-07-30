<script lang="ts">
  import { setContext } from 'svelte';
  import Form from './components/Form/Form.svelte';
  import Item from './Item';
  import List from './components/Items/List.svelte';

  import itemsStore from './stores/items';

  export let items: ItemSource[] = [];
  export let discounts: Discount[] = [];
  export let backUrl: string;
  export let submitUrl: string;

  itemsStore.set(items.map((item) => new Item(item)));

  setContext(
    'discounts',
    new Map(discounts.map((discount) => [discount.id, discount])) as Discounts
  );

  let error: string;
</script>

{#if error}
  <div class="alert alert-error">
    <button type="button" class="close" on:click="{() => (error = undefined)}">
      &times;
    </button>
    <strong>Ошибка:</strong>
    {error}
  </div>
{/if}

<div class="row">
  <div class="span12">
    <div class="l-errors"></div>
    <div class="l-application">
      <div class="l-form">
        <Form backUrl="{backUrl}" submitUrl="{submitUrl}" bind:error />
      </div>
      <div class="l-items">
        <List />
      </div>
    </div>
  </div>
</div>
