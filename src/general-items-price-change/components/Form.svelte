<script lang="ts">
  import sourcePrice from '../stores/source-price';
  import calcAction from '../stores/calc-action';

  function onCalcActionClick(event: Event): void {
    event.preventDefault();
    const action = (event.target as HTMLElement).dataset.value;
    if (action != null) {
      $calcAction = action;
    }
  }

  // function onSourcePriceChange(value: string): void {
  //   if (value === 'price' && $calcAction === 'revert') {
  //     $calcAction = 'discount';
  //   }
  // }

  // $: onSourcePriceChange($sourcePrice);
</script>

<form>
  <div class="l-source-price">
    <legend class="c-form-legend">Цена, участвуюшая в расчетах</legend>
    <label class="radio">
      <input type="radio" bind:group="{$sourcePrice}" value="price" />
      Текущая цена
    </label>
    <label class="radio">
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
          on:click="{onCalcActionClick}"
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

  </div>

  {#if $calcAction === 'discount'}
    <div class="l-discount">
      <p>Предопределенная скидка</p>
      <p>Число (проценты/сумма)</p>
    </div>
  {:else if $calcAction === 'markup'}
    <div class="l-markup">
      <p>Число (проценты/сумма)</p>
    </div>
  {:else}
    <div class="l-revert">
      <p>Предупреждение</p>
    </div>
  {/if}

  <p>Скидка/наценка (знак, число, процент/сумма)</p>
  <p>Предопределенная скидка (select)</p>
  <p>Формула (text)</p>
  <p>Округление</p>
  <p>До (radio, десятков/сотен/тысяч)</p>
  <p>Куда (radio, математически/вверх/вниз)</p>
  <p>И уменьшить на (число, пример)</p>
</form>
