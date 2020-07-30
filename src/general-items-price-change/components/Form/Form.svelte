<script lang="ts">
  import calcParamsStore from '../../stores/calc-params';
  import itemsStore from '../../stores/items';

  import Pills from './Pills.svelte';
  import Discount from './Discount.svelte';
  import Markup from './Markup.svelte';
  import Revert from './Revert.svelte';
  import Roundness from './Roundness.svelte';

  export let backUrl: string;
  export let submitUrl: string;
  export let error: string;

  async function onSubmit(): Promise<void> {
    let items: {
      pos: number;
      price: number;
      new_price?: number;
    }[] = $itemsStore
      .filter((item) => item.checked)
      .map((item) => ({
        pos: item.pos,
        price: item.price,
        new_price: item.getNewPrice($calcParamsStore)
      }));
    if (items.length === 0) {
      error = 'Не выбран ни один тур для изменения цены';
      return;
    }
    if (items.some((item) => item.new_price <= 0)) {
      error =
        'После применения параметров скидки или наценки некоторые цены станут отрицательными или нулевыми';
      return;
    }
    items = items.filter((item) => item.price !== item.new_price);
    if (items.length === 0) {
      error =
        'С текущими пераметрами скидки, наценки или округления цены туров не изменились';
      return;
    }
    items = items.map((item) => ({ pos: item.pos, price: item.new_price }));
    if (!submitUrl) {
      error =
        'Отсутствует необходимый параметр submitUrl. Обратитесь в службу поддержки';
      return;
    }
    error = undefined;

    const formData = new FormData();
    formData.append('items', JSON.stringify(items));

    const response = await fetch(submitUrl, {
      method: 'post',
      body: formData
    });

    if (response.status >= 400) {
      error = (await response.text()) || response.statusText;
    } else {
      window.location.assign(backUrl);
    }
  }
</script>

<form on:submit|preventDefault="{onSubmit}">
  <Pills
    labels="{['Скидка', 'Наценка', 'Отмена']}"
    values="{['discount', 'markup', 'revert']}"
    bind:value="{$calcParamsStore.action}"
  />
  <Discount />
  <Markup />
  <Revert />
  <Roundness />
  <div class="l-form__buttons">
    <input class="btn btn-primary" type="submit" value="Изменить цены" />
    <a href="{backUrl}" class="btn">Назад</a>
  </div>
</form>
