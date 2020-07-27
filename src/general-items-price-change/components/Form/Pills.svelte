<script lang="ts">
  /**
   * Usage:
   *
   * <Pills
   *   labels="{['Скидка', 'Наценка', 'Отмена']}"
   *   values="{['discount', 'markup', 'revert']}"
   *   bind:value="{variable}"
   * />
   */

  export let values: string[] = [];
  export let labels: string[] = values;
  export let value: string;
</script>

<div class="c-pills">
  {#each values as v, index (v)}
    <label class="c-pill__label radio inline">
      <input type="radio" value="{v}" bind:group="{value}" />
      <span class="c-pill__body">{labels[index] || v}</span>
    </label>
  {/each}
</div>
