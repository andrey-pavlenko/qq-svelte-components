<script lang="ts">
  import { get } from 'svelte/store';
  import { getContext } from 'svelte';
  import calcParamsStore from '../../stores/calc-params';
  import PriceKey from './PriceKey.svelte';
  import InputValue from './InputValue.svelte';

  // Visibility =================================

  $: visible = $calcParamsStore.action === 'discount';

  function onVisibleChange(visible) {
    if (visible) {
      $calcParamsStore.priceKey = priceKey;
      const predefinedDiscountCalcValue = getCalcValueFromPredefinedDiscountId(
        prefefinedDiscountId
      );
      if (predefinedDiscountCalcValue != null) {
        $calcParamsStore.calcValue = predefinedDiscountCalcValue;
      } else if (Number.isFinite(discountValue) && discountValue > 0) {
        $calcParamsStore.calcValue = {
          type: discountType,
          value: discountValue
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

  // Discount ===================================

  const discounts: Discounts = getContext('discounts');

  let prefefinedDiscountId: number | undefined;
  let discountValue: CalcValue['value'];
  let discountType: CalcValue['type'];

  function getCalcValueFromPredefinedDiscountId(
    id: number
  ): CalcValue | undefined {
    const discount = discounts.get(id);
    if (discount != null) {
      discountValue = undefined;
      if (discount.percentage != null) {
        return {
          value: discount.percentage,
          type: 'percent'
        };
      } else {
        return {
          value: discount.value,
          type: 'amount'
        };
      }
    }
  }

  function onPredefinedDiscountChange(discountId: number | undefined): void {
    if (discountId != null) {
      const calcValue = getCalcValueFromPredefinedDiscountId(discountId);
      if (calcValue != null) {
        discountValue = undefined;
        $calcParamsStore.calcValue = calcValue;
      }
    }
  }

  $: onPredefinedDiscountChange(prefefinedDiscountId);

  function onDiscountChange(
    value: CalcValue['value'],
    type: CalcValue['type']
  ): void {
    if (Number.isFinite(value) && value > 0) {
      prefefinedDiscountId = undefined;
      $calcParamsStore.calcValue = {
        type: type,
        value: value
      };
    }
  }

  $: onDiscountChange(discountValue, discountType);
</script>

<div class:hide="{!visible}">
  <legend class="c-form-legend">Цена, участвуюшая в расчетах</legend>
  <PriceKey bind:value="{priceKey}" />
  <p class="text-warning">
    {priceKey === 'initial_price' ? 'Исходные' : 'Текущие'} цены всех туров
    будут уменьшены на указанный процент или сумму в соответствии с выбранной
    скидкой или введенным значением.&#x20;
    {#if priceKey === 'price'}
      <strong>
        Уже существующие скидки будут суммированы с новой скидкой.
      </strong>
    {:else}
      <strong>Уже существующие скидки и наценки будут удалены.</strong>
    {/if}
  </p>
  {#if discounts.size > 0}
    <label>Предопределенная скидка</label>
    <select class="input-block-level" bind:value="{prefefinedDiscountId}">
      <option
        value="{undefined}"
        selected="{prefefinedDiscountId == null}"
        disabled
        hidden
      >
        Скидка не выбрана
      </option>
      {#each Array.from(discounts.entries()) as discount (discount[0])}
        <option value="{discount[0]}">{discount[1].name}</option>
      {/each}
    </select>
  {/if}
  <label>Значение скидки</label>
  <InputValue bind:value="{discountValue}" bind:type="{discountType}" />

</div>
