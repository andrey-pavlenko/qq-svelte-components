<script lang="ts">
  export let checked: boolean = false;
  export let indeterminate: boolean = false;

  function useIndeterminate(
    checkbox: HTMLInputElement,
    indeterminateState: boolean
  ) {
    checkbox.indeterminate = indeterminateState;

    return {
      update(indeterminateState: boolean): void {
        checkbox.indeterminate = indeterminateState;
      }
    };
  }
</script>

<input type="checkbox" bind:checked use:useIndeterminate="{indeterminate}" />
