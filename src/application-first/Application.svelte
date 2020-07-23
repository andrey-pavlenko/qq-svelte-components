<script lang="ts">
  export let name: string;
  export let surName: string = 'No surName defined';

  function getName(): string {
    return 'Test';
  }
</script>

<style>
  h2 {
    color: blue;
  }
</style>

<main>
  <h1>Hello {name}!</h1>
  <h2>Hello {surName}!</h2>
</main>
