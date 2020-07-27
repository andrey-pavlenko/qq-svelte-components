<script lang="ts">
  import calcParamsStore from '../../stores/calc-params';

  // Visibility =================================

  $: visible = $calcParamsStore.action === 'revert';

  function onVisibleChange(visible: boolean) {
    if (visible) {
      $calcParamsStore.priceKey = 'initial_price';
      const { calcValue, ...rest } = $calcParamsStore;
      $calcParamsStore = rest;
    }
  }

  $: onVisibleChange(visible);
</script>

<div class:hide="{!visible}">
  <p class="text-warning">
    Текущая цена всех туров будет заменена на исходную цену.
    <strong>Все скидки и наценки будут отменены.</strong>
  </p>

</div>
