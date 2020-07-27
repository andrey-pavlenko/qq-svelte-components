<script lang="ts">
  import { tick } from 'svelte';
  import calcParamsStore from '../../stores/calc-params';

  import Pills from './Pills.svelte';
  import Discount from './Discount.svelte';
  import Markup from './Markup.svelte';
  import Revert from './Revert.svelte';
  import Roundness from './Roundness.svelte';

  export let backUrl: string;
  export let submitUrl: string;

  async function onCalcParamsChange(): Promise<void> {
    await tick();
    console.info('calcParamsStore', JSON.stringify($calcParamsStore, null, 2));
  }

  calcParamsStore.subscribe(onCalcParamsChange);

  function onSubmit(): void {
    console.info('onSubmit', submitUrl);
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
