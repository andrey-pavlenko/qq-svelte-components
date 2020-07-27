<script lang="ts">
  import calcParamsStore from '../../stores/calc-params';

  let doRound: boolean = false;
  let to: number = 100;
  let method: RoundMethods = 'round';
  let decrease: number;

  function updateParams() {
    if (doRound) {
      $calcParamsStore.round = {
        to,
        method
      };
      if (Number.isFinite(decrease) && decrease > 0) {
        $calcParamsStore.decrease = decrease;
      } else {
        const { decrease, ...rest } = $calcParamsStore;
        $calcParamsStore = rest;
      }
    } else {
      const { round, decrease, ...rest } = $calcParamsStore;
      $calcParamsStore = rest;
    }
  }

  // @ts-ignore
  $: updateParams(doRound);
  // @ts-ignore
  $: updateParams(to);
  // @ts-ignore
  $: updateParams(method);
  // @ts-ignore
  $: updateParams(decrease);
</script>

<legend class="c-form-legend">
  <label class="checkbox">
    <input type="checkbox" bind:checked="{doRound}" />
    Округление
  </label>
</legend>
<div class="l-roundness" class:hide="{!doRound}">
  <p class="text-warning">Округлить результат вычислений.</p>
  <div class="l-roundness__params">
    <div class="l-round__to">
      <label class="radio">
        <input type="radio" bind:group="{to}" value="{10}" />
        До десятков
      </label>
      <label class="radio">
        <input type="radio" bind:group="{to}" value="{100}" />
        До сотен
      </label>
      <label class="radio">
        <input type="radio" bind:group="{to}" value="{1000}" />
        До тысяч
      </label>
    </div>
    <div class="l-round__type">
      <label class="radio">
        <input type="radio" bind:group="{method}" value="round" />
        Математически
      </label>
      <label class="radio">
        <input type="radio" bind:group="{method}" value="ceil" />
        В большую сторону
      </label>
      <label class="radio">
        <input type="radio" bind:group="{method}" value="floor" />
        В меньшую сторону
      </label>
    </div>
  </div>
  <div class="l-decrease">
    <div class="l-decrease__to">
      <label>После округления уменьшить результат на</label>
      <input
        class="input-block-level"
        type="number"
        min="0"
        step="1"
        bind:value="{decrease}"
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
</div>
