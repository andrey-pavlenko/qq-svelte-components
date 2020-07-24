<script lang="ts">
  import { getContext } from 'svelte';
  import sourcePrice from '../../stores/source-price';
  import calcAction from '../../stores/calc-action';
  import InputValue from './InputValue.svelte';

  const discounts: Discounts = getContext('discounts');
  let prefefinedDiscountId: number | undefined;
  let discountValue: CalcValue['value'];
  let discountType: CalcValue['type'];
  let markupValue: CalcValue['value'];
  let markupType: CalcValue['type'];
  let doRoundness: boolean = true;
  let roundTo: number = 100;
  let roundType: string = 'math';
  let decreaseTo: number;

  function onCalcActionClick(event: Event): void {
    const action = (event.target as HTMLElement).dataset.value;
    if (action != null) {
      $calcAction = action;
    }
  }

  function onPredefinedDiscountChange(discountId: number | undefined): void {
    if (discountId != null) {
      discountValue = undefined;
    }
  }

  function onDiscountChange(
    value: CalcValue['value'],
    type: CalcValue['type']
  ): void {
    console.info('onDiscountChange', value, type);
    if (Number.isFinite(value)) {
      prefefinedDiscountId = undefined;
    }
  }

  function onMarkupChange(
    value: CalcValue['value'],
    type: CalcValue['type']
  ): void {
    console.info('onMarkupChange', value, type);
  }

  function onRoudnessChange(enabled: boolean, to: number, type: string): void {
    console.info('onRoudnessChange', enabled, to, type);
  }

  function onSubmit(): void {
    console.info('onSubmit');
  }

  $: onPredefinedDiscountChange(prefefinedDiscountId);
  $: onDiscountChange(discountValue, discountType);
  $: onMarkupChange(markupValue, markupType);
  $: onRoudnessChange(doRoundness, roundTo, roundType);
</script>

<form on:submit|preventDefault="{onSubmit}">
  <div class="l-source-price">
    <legend class="c-form-legend">Цена, участвуюшая в расчетах</legend>
    <label class="radio inline">
      <input type="radio" bind:group="{$sourcePrice}" value="price" />
      Текущая цена
    </label>
    <label class="radio inline">
      <input type="radio" bind:group="{$sourcePrice}" value="initial_price" />
      Исходная цена
      <small class="text-warning">с сайта туроператора</small>
    </label>
  </div>

  <div class="l-calc-action">
    <legend class="c-form-legend">Действие</legend>
    <ul class="nav nav-pills">
      <li class:active="{$calcAction === 'discount'}">
        <a
          on:click|preventDefault="{onCalcActionClick}"
          role="button"
          href="#calc-action"
          data-value="discount"
        >
          Скидка
        </a>
      </li>
      <li class:active="{$calcAction === 'markup'}">
        <a
          on:click="{onCalcActionClick}"
          role="button"
          href="#calc-action"
          data-value="markup"
        >
          Наценка
        </a>
      </li>
      {#if $sourcePrice === 'initial_price'}
        <li class:active="{$calcAction === 'revert'}">
          <a
            on:click="{onCalcActionClick}"
            role="button"
            href="#calc-action"
            data-value="revert"
          >
            Отмена
          </a>
        </li>
      {/if}
    </ul>
    {#if $calcAction === 'discount'}
      <div class="l-discount">
        <p class="text-warning">
          {$sourcePrice === 'initial_price' ? 'Исходные' : 'Текущие'} цены всех
          туров будут уменьшены на указанный процент или сумму в соответствии с
          выбранной скидкой или введенным значением.
          {#if $sourcePrice === 'price'}
            <strong>
              &#x20Уже существующие скидки буду суммированы с новой скидкой.
            </strong>
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
    {:else if $calcAction === 'markup'}
      <div class="l-markup">
        <p class="text-warning">
          {$sourcePrice === 'initial_price' ? 'Исходные' : 'Текущие'} цены всех
          туров будут умеличены на указанный процент или сумму в соответствии
          введенным значением.
          {#if $sourcePrice === 'price'}
            <strong>
              &#x20Уже существующие наценки буду суммированы с новой наценкой.
            </strong>
          {/if}
        </p>
        <label>Значение наценки</label>
        <InputValue bind:value="{markupValue}" bind:type="{markupType}" />
      </div>
    {:else}
      <div class="l-revert">
        <p class="text-warning">
          Текущая цена всех туров будет заменена на исходную цену.
          <strong>Все скидки и наценки будут отменены.</strong>
        </p>
        <p>Предупреждение</p>
      </div>
    {/if}

  </div>

  <div class="l-roundness">
    <legend class="c-form-legend">
      <label class="checkbox">
        <input type="checkbox" bind:checked="{doRoundness}" />
        Округление
      </label>
    </legend>
    {#if doRoundness}
      <p class="text-warning">Округлить результат вычислений.</p>
      <div class="l-roundness__params">
        <div class="l-round__to">
          <label class="radio">
            <input type="radio" bind:group="{roundTo}" value="{10}" />
            До десятков
          </label>
          <label class="radio">
            <input type="radio" bind:group="{roundTo}" value="{100}" />
            До сотен
          </label>
          <label class="radio">
            <input type="radio" bind:group="{roundTo}" value="{1000}" />
            До тысяч
          </label>
        </div>
        <div class="l-round__type">
          <label class="radio">
            <input type="radio" bind:group="{roundType}" value="math" />
            Математически
          </label>
          <label class="radio">
            <input type="radio" bind:group="{roundType}" value="ceil" />
            В большую сторону
          </label>
          <label class="radio">
            <input type="radio" bind:group="{roundType}" value="floor" />
            В меньшую сторону
          </label>
        </div>

      </div>
    {/if}
  </div>

  {#if doRoundness}
    <div class="l-decrease">
      <div class="l-decrease__to">
        <label>После округления уменьшить результат на</label>
        <input
          class="input-block-level"
          type="number"
          min="0"
          step="1"
          bind:value="{decreaseTo}"
          placeholder="Число"
        />
      </div>
      <p class="l-decrease__example text-warning">
        Чтобы получить, например, такую цену:
        <strong>10&nbsp;000&nbsp;</strong>
        &rarr;&nbsp;
        <strong>9&nbsp;999</strong>
        или
        <strong>10&nbsp;000&nbsp;</strong>
        &rarr;
        <strong>&nbsp;9&nbsp;990</strong>
      </p>
    </div>
  {/if}

  <input class="btn btn-primary" type="submit" value="Изменить цены" />
  <a href="goto-back" class="btn">Назад</a>

</form>
