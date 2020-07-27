<script lang="ts">
  import { setContext } from 'svelte';
  import Form from './components/Form/Form.svelte';
  import Item from './Item';
  import itemsStore from './stores/items';
  import List from './components/Items/List.svelte';

  export let items: ItemSource[] = [];
  export let discounts: Discount[] = [];
  export let backUrl: string;
  export let submitUrl: string;

  itemsStore.set(items.map((item) => new Item(item)));

  setContext(
    'discounts',
    new Map(discounts.map((discount) => [discount.id, discount])) as Discounts
  );
</script>

<div class="row">
  <div class="span12 hspan">
    <h4>Общее изменение цен на все туры</h4>
  </div>
</div>

<div class="row">
  <div class="span12">
    <div class="l-errors"></div>
    <div class="l-application">
      <div class="l-form">
        <Form backUrl="{backUrl}" submitUrl="{submitUrl}" />
      </div>
      <div class="l-items">
        <List />
      </div>
    </div>
  </div>
</div>
