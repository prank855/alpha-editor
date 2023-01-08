<script lang="ts">
  import ContextMenu from "./ContextMenu.svelte";
  import GameNode from "./Hierarchy/GameNode.svelte";
  import type { IGameNode } from "./IGameNode";

  let addGameNode = () => {
    gameNodes = [
      ...gameNodes,
      { name: "Empty GameNode", children: [], parent: null },
    ];
  };

  let gameNodes: IGameNode[] = [];

  let removeChild = (node: IGameNode) => {
    gameNodes = gameNodes.filter((n) => n !== node);
  };

  let ctxMenu: ContextMenu;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="hierarchy" on:contextmenu={ctxMenu.open}>
  <center>Hierarchy</center>
  <hr />
  <div id="gameNodes">
    {#each gameNodes as gameNode}
      <GameNode
        {gameNode}
        on:deleteMe={(c) => {
          removeChild(c.detail);
        }}
      />
    {/each}
  </div>
</div>

<ContextMenu
  ctxMenu={{
    title: "Hierarchy",
    items: [
      {
        title: "Add GameNode",
        action: addGameNode,
      },
    ],
  }}
  bind:this={ctxMenu}
/>

<style>
  #hierarchy {
    height: 100%;
  }
  #gameNodes {
    height: 100%;
    overflow-y: auto;
  }
</style>
