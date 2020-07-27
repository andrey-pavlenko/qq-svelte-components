<script lang="ts">
  export let value: CalcValue['value'];
  export let type: CalcValue['type'] = 'percent';
</script>

<div class="l-input-value">
  <div class="l-input-value__number">
    <input
      class="input-block-level"
      type="number"
      step="any"
      min="0"
      max="{type === 'percent' ? '100' : undefined}"
      placeholder="Положительное число"
      bind:value
    />
  </div>
  <div class="l-input-value__type">
    <label class="radio inline">
      <input type="radio" bind:group="{type}" value="percent" />
      В процентах
    </label>
    <label class="radio inline">
      <input type="radio" bind:group="{type}" value="amount" />
      В сумме
    </label>
  </div>
</div>
