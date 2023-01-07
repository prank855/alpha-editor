<script lang="ts">
  let ctxMenu: {
    title: string;
    items: {
      title: string;
      action: () => void;
    }[];
  };

  export const open = (e) => {
    // check if right cli
    const event = e as PointerEvent;
    event.stopPropagation();

    event.preventDefault();
    visible = true;
    pos = { x: event.clientX, y: event.clientY };
  };

  export const close = () => {
    visible = false;
  };

  let pos: { x: number; y: number } = { x: 0, y: 0 };

  let visible = false;

  export { ctxMenu };
</script>

{#if visible}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    id="ctx-menu"
    style="left: {pos.x - 2}px; top:{pos.y - 2}px"
    on:mouseleave={close}
    on:click={close}
  >
    {ctxMenu.title}
    {#each ctxMenu.items as item}
      <br />
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <button on:click={item.action}>{item.title}</button>
    {/each}
  </div>
{/if}

<style>
  #ctx-menu {
    position: absolute;
    background-color: rgb(3, 3, 3, 0.5);
    border: 1px solid black;
    border-radius: 5%;
    padding: 5px;
    width: auto;
    z-index: 100;
  }
</style>
