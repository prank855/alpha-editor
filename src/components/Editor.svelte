<script>
  import Hierarchy from "./Hierarchy.svelte";
  import Scene from "./Scene.svelte";
</script>

<div id="editor">
  <div id="hierarchy"><Hierarchy /></div>
  <div id="scene"><Scene /></div>
</div>

<style>
  #editor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    color: rgb(255, 255, 255);
    overflow: hidden;
  }

  #hierarchy {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 100%;
    background-color: #222;
  }

  #scene {
    position: absolute;
    top: 0;
    left: 200px;
    width: calc(100% - 200px);
    height: 100%;
  }
</style>
