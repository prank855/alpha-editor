<script>
  import Hierarchy from "./Hierarchy.svelte";
  import Scene from "./Scene.svelte";
</script>

<div id="editor">
  <div id="hierarchy"><Hierarchy /></div>
  <div id="scene"><Scene /></div>
</div>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

  #editor {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #222;
    color: rgb(255, 255, 255);
    overflow: hidden;
    font-family: "Roboto", sans-serif;
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
