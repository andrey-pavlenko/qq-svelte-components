<style>
  .l-icons {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .c-icon {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5em;
    margin: 0 0.5em 0.5em 0;
  }

  svg {
    display: block;
    margin: 0 auto;
  }

  .c-icon-label {
    font-size: 10px;
    line-height: 10px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
    margin: 1em 0 0 0;
  }
</style>

<script lang="ts">
  export let iconFileUrl: string = './img/icons.svg';
  export let width: string = '3em';
  export let height: string = '3em';

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
</script>

<div>
  {#await getIconsId(iconFileUrl)}
    <div class="alert">Loading...</div>
  {:then iconsId}
    <div class="l-icons">
      {#each iconsId as id (id)}
        <div class="c-icon" style="max-width: calc({width} + 1em)">
          <div class="c-icon-picture">
            <svg style="max-height: {height}; max-width: {width}">
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
