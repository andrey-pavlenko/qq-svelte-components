<style>
  h2 {
    color: blue;
  }
</style>

<script lang="ts">
  export let name: string;
  export let surName: string = "No surName defined";

  function someTest(input: string): string {
    if (input === "1") {
      return "one";
    }
    return "many";
  }
</script>

<main>
  <h1>Hello {name}!</h1>
  <h2>Hello {surName}!</h2>
  <p>{someTest('1')}</p>
  <p>{someTest('2')}</p>
</main>
