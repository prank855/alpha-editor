<script lang="ts">
  import { onMount } from "svelte";
  import { SceneRenderer } from "../lib/plx/SceneRenderer";

  let divElement: HTMLElement;

  let scene: SceneRenderer = new SceneRenderer();

  onMount(() => {
    scene.onMount(divElement);
  });
</script>

<div bind:this={divElement} id="scene-view" />

<style>
  #scene-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
