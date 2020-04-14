<template>
  <div id="app">
    <Layout />
    <!--<MonacoEditor />-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Layout from "./components/Layout.vue";
import MonacoEditor from "./components/MonacoEditor.vue";

@Component({
  components: {
    Layout,
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
