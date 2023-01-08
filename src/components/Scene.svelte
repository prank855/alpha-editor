<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { SceneRenderer } from "../lib/plx/SceneRenderer";

  let divElement: HTMLElement;

  let sceneRenderer: SceneRenderer = new SceneRenderer();

  onMount(() => {
    sceneRenderer.onMount(divElement);
  });

  onDestroy(() => {
    sceneRenderer.onDestroy();
  });
</script>

<div id="bg" />

<div
  bind:this={divElement}
  id="scene-view"
  on:contextmenu={(e) => {
    e.preventDefault();
  }}
/>

<style>
  #scene-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  #bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.25;
    background: url(https://grainy-gradients.vercel.app/noise.svg);
  }
</style>
