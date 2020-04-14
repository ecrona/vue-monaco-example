<template>
  <div ref="monacoEditor" class="monaco-editor" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as monaco from "monaco-editor";

const code = `
function foo() {
  return 'foo'
}
`.trim();
// TODO: Fix
let editor: monaco.editor.IStandaloneCodeEditor;

@Component({
  components: {},
  data: function() {
    return {
      code,
      language: "javascript",
      theme: "vs",
      options: {
        lineNumbers: true
      }
    };
  },
  mounted: function() {
    editor = monaco.editor.create(this.$refs.monacoEditor as HTMLElement, {
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      language: "typescript"
    });
  },
  destroyed: function() {
    editor.getModel()?.dispose();
  }
})
export default class MonacoEditor extends Vue {}
</script>

<style scoped lang="less">
body {
  margin: 0;
}

.monaco-editor {
  height: 500px;
}
</style>
