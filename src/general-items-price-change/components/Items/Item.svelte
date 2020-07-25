<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;
  export let pos: number;
  export let name: string;
  export let checkin: string;
  export let nights: number = 0;
  export let initial_price: number = 0;
  export let price: number = initial_price;
  export let newPrice: number = initial_price;
  export let currency: string;
  export let isLast: boolean = false;

  function formatPrice(price: number): string {
    return price.toLocaleString();
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  const dispatch = createEventDispatcher();

  function onCheckedChange(event: Event) {
    dispatch('item:check', {
      checked: (event.target as HTMLInputElement).checked,
      pos
    });
  }
</script>

<tr>
  <td class="c-item__check">
    <input type="checkbox" checked="{checked}" on:change="{onCheckedChange}" />
  </td>
  <td class="c-item__title">
    <div class="c-title__name" title="{name}">{name}</div>
    <div class="c-title__nights">{nights} ночей, с {formatDate(checkin)}</div>
  </td>
  <td class="c-item__price--init" class:is-last="{isLast}">
    {formatPrice(initial_price)}
  </td>
  <td class="c-item__price" class:is-last="{isLast}">{formatPrice(price)}</td>
  <td class="c-item__price--new">{formatPrice(newPrice)}</td>
  <td class="c-item__currency">
    <small>{currency}</small>
  </td>
</tr>
