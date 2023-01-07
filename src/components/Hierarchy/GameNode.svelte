<script lang="ts">
  import ContextMenu from "../ContextMenu.svelte";
  import type { IGameNode } from "../IGameNode";

  let gameNode: IGameNode;

  $: children = gameNode.children;
  $: name = gameNode.name;

  let addChild = () => {
    console.log("Add Child");
    gameNode.children = [...gameNode.children, { name: "Child", children: [] }];
  };

  let remove = () => {
    if (!parent) return;
    console.log("Before", parent.children);
    parent.children = parent.children.filter((child) => child !== gameNode);
    console.log("After", parent.children);
    parent = { ...parent };
  };

  let ctxMenu: ContextMenu;

  let parent: IGameNode = null;

  export { gameNode, parent };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="gameNode" on:contextmenu={ctxMenu.open}>
  {name}
  <div class="children">
    {#if children.length > 0}
      <div>
        {#each children as child}
          <svelte:self gameNode={child} parent={gameNode} />
        {/each}
      </div>
    {/if}
  </div>
</div>

<ContextMenu
  ctxMenu={{
    title: gameNode.name,
    items: [
      {
        title: "Add Child",
        action: addChild,
      },
      {
        title: "Remove",
        action: remove,
      },
    ],
  }}
  bind:this={ctxMenu}
/>

<style>
  .gameNode {
    border: 1px solid black;
    border-radius: 5%;
    text-align: center;
    text-justify: distribute;
  }
  .children {
    margin-left: 10px;
  }
</style>
