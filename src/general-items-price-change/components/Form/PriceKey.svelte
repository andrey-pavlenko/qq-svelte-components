<script lang="ts">
  export let value: PriceKeys;
</script>

<label class="radio inline">
  <input type="radio" bind:group="{value}" value="price" />
  Текущая цена
</label>
<label class="radio inline">
  <input type="radio" bind:group="{value}" value="initial_price" />
  Исходная цена
  <small class="text-warning">с сайта туроператора</small>
</label>
