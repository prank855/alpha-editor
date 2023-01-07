<script lang="ts">
  import ContextMenu from "../ContextMenu.svelte";
  import type { IGameNode } from "../IGameNode";

  let gameNode: IGameNode;

  $: gameNodeChildren = gameNode.children;

  let addChild = () => {
    gameNode.children = [
      ...gameNode.children,
      { name: "Child", children: [], parent: gameNode },
    ];
    childrenVisible = true;
  };

  let remove = (node: IGameNode) => {
    gameNode.children = gameNode.children.filter((n) => n !== node);
  };

  let ctxMenu: ContextMenu;

  let parentRemove;

  let inputField: HTMLInputElement;

  let childrenVisible = false;

  export { gameNode, parentRemove };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div class="gameNode" on:contextmenu={ctxMenu.open}>
  <div id="header">
    <input
      class="text"
      type="text"
      bind:value={gameNode.name}
      bind:this={inputField}
      readonly={true}
      on:dblclick={() => {
        inputField.readOnly = false;
        inputField.focus();
      }}
      on:blur={() => {
        inputField.readOnly = true;
      }}
      on:keydown={(e) => {
        if (e.key == "Enter") {
          inputField.readOnly = true;
          window.getSelection().removeAllRanges();
          inputField.blur();
        }
      }}
    />
    {#if gameNodeChildren.length > 0}
      <button
        id="toggleChildren"
        on:click={() => (childrenVisible = !childrenVisible)}
      >
        {childrenVisible ? "- " : "+"}
      </button>
    {/if}
  </div>
</div>
{#if childrenVisible}
  <div class="children">
    {#if gameNodeChildren.length > 0}
      <div>
        {#each gameNodeChildren as child}
          <svelte:self gameNode={child} parentRemove={remove} />
        {/each}
      </div>
    {/if}
  </div>
{/if}

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
        action: () => {
          parentRemove(gameNode);
        },
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
    background-color: #444;
  }
  .children {
    margin-left: 10px;
  }

  #toggleChildren {
    right: 0px;
    float: right;
    border: none;
    background-color: transparent;
    color: white;
    font-weight: 600;
    font-size: larger;
  }

  #header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    border: none;
    width: 100%;
    text-align: center;
    background-color: transparent;
    color: white;
    font: inherit;
  }
</style>
