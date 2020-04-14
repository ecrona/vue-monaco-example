<template>
  <div id="app">
    <MonacoEditor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MonacoEditor from "./components/MonacoEditor.vue";

@Component({
  components: {
    MonacoEditor
  }
})
export default class App extends Vue {}
</script>

<style lang="less">
body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
