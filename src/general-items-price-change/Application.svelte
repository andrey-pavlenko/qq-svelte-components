<script lang="ts">
  import ItemsList from './components/Items/List.svelte';
  import Form from './components/Form.svelte';

  export let items: ItemSource[] = [];
</script>

<div class="row">
  <div class="span12 hspan">
    <h4>Общее изменение цен на все туры</h4>
  </div>
</div>

<div class="row">
  <div class="span12">
    <div class="l-errors"></div>
    <div class="l-application">
      <div class="l-form">
        <Form />
      </div>
      <div class="l-items">
        <ItemsList
          items="{items.map((item) => ({ ...item, ...{ checked: true } }))}"
        />
      </div>
    </div>
  </div>
</div>
