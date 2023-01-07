<script lang="ts">
  import ContextMenu from "./ContextMenu.svelte";
  import GameNode from "./Hierarchy/GameNode.svelte";
  import type { IGameNode } from "./IGameNode";

  let addGameNode = () => {
    console.log("Add GameNode");
    gameNodes = [...gameNodes, { name: "GameNode", children: [] }];
  };

  let gameNodes: IGameNode[] = [];

  let ctxMenu: ContextMenu;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="hierarchy" on:contextmenu={ctxMenu.open}>
  <center>Hierarchy</center>
  <hr />
  {#each gameNodes as gameNode}
    <GameNode {gameNode} />
  {/each}
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
</style>
