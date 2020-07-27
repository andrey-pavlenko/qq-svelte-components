<script lang="ts">
  import { get } from 'svelte/store';
  import calcParamsStore from '../../stores/calc-params';
  import PriceKey from './PriceKey.svelte';
  import InputValue from './InputValue.svelte';

  // Visibility =================================

  $: visible = $calcParamsStore.action === 'markup';

  function onVisibleChange(visible: boolean) {
    if (visible) {
      $calcParamsStore.priceKey = priceKey;
      if (Number.isFinite(markupValue) && markupValue > 0) {
        $calcParamsStore.calcValue = {
          type: markupType,
          value: markupValue
        };
      } else {
        const { calcValue, ...rest } = $calcParamsStore;
        $calcParamsStore = rest;
      }
    }
  }

  $: onVisibleChange(visible);

  // Price key ==================================

  let priceKey = get(calcParamsStore).priceKey;

  function onPriceKeyChange(value: PriceKeys) {
    if (visible && $calcParamsStore.priceKey != priceKey) {
      $calcParamsStore.priceKey = priceKey;
    }
  }

  $: onPriceKeyChange(priceKey);

  // Markup =====================================

  let markupValue: CalcValue['value'];
  let markupType: CalcValue['type'];

  function onMarkupChange(
    value: CalcValue['value'],
    type: CalcValue['type']
  ): void {
    if (Number.isFinite(value) && value > 0) {
      $calcParamsStore.calcValue = {
        type: type,
        value: value
      };
    } else {
      const { calcValue, ...rest } = $calcParamsStore;
      $calcParamsStore = rest;
    }
  }

  $: onMarkupChange(markupValue, markupType);
</script>

<div class:hide="{!visible}">
  <legend class="c-form-legend">Цена, участвуюшая в расчетах</legend>
  <PriceKey bind:value="{priceKey}" />
  <p class="text-warning l-help">
    {priceKey === 'initial_price' ? 'Исходные' : 'Текущие'} цены всех туров
    будут умеличены на указанный процент или сумму в соответствии введенным
    значением.&#x20;
    {#if priceKey === 'price'}
      <strong>
        Уже существующие наценки буду суммированы с новой наценкой.
      </strong>
    {:else}
      <strong>Уже существующие скидки и наценки будут удалены.</strong>
    {/if}
  </p>
  <label>Значение наценки</label>
  <InputValue bind:value="{markupValue}" bind:type="{markupType}" />
</div>
