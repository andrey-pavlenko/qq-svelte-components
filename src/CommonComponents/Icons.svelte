<style lang="sass">
  .l-icons 
    display: flex
    flex-wrap: wrap
    align-items: flex-start
  
  .c-icon 
    border: 1px solid #ddd
    border-radius: 4px
    padding: 0.5em
    margin: 0 0.5em 0.5em 0

    svg 
      display: block
      margin: 0 auto

  .c-icon-label 
    font-size: 10px
    line-height: 10px
    text-align: center
    overflow: hidden
    text-overflow: ellipsis
    cursor: default
    margin: 1em 0 0 0
</style>

<script lang="ts">
  export let iconFileUrl: string = './img/icons.svg';
  export let size: number = 3;
  export let color: string;

  async function getIconsId(iconFileUrl) {
    const response = await fetch(iconFileUrl);
    if (response.status >= 400) {
      throw new Error(
        `${iconFileUrl} ${response.status}: ${response.statusText}`
      );
    }
    const content = await response.text();
    return [...content.matchAll(/id\s*=\s*['"]([^'"]+)['"]/g)].map(
      (match) => match[1]
    );
  }

  $: iconsId = getIconsId(iconFileUrl);
</script>

<div>
  {#await iconsId}
    <div class="alert">Loading...</div>
  {:then iconsId}
    <div class="l-icons" style="{color ? `color: ${color}` : ''}">
      {#each iconsId as id (id)}
        <div class="c-icon" style="max-width: calc({size}em + 1em)">
          <div class="c-icon-picture">
            <svg style="max-height: {size}em; max-width: {size}em">
              <use xlink:href="{iconFileUrl}#{id}"></use>
            </svg>
          </div>
          <div class="c-icon-label" title="{id}">{id}</div>
        </div>
      {/each}
    </div>
  {:catch error}
    <div class="alert alert-error">{error.message}</div>
  {/await}
</div>
