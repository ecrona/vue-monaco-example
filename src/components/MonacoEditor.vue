<template>
  <div ref="monacoEditor" class="monaco-editor" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as monaco from "monaco-editor";

const code = `
import React, Component from 'react';
import render from 'react-dom';
import Hello from './hello';
import './style.css';

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <p>
          Start editing to see some magic happen :)
        </p>
      </div>
    );
  }
`.trim();
// TODO: Fix
let editor: monaco.editor.IStandaloneCodeEditor;
monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSemanticValidation: true,
  noSyntaxValidation: true
});
monaco.editor.defineTheme("main", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ececec"
  }
});

@Component({
  components: {},
  props: ["width"],
  watch: {
    width: function() {
      console.log("update");
      editor.layout();
    }
  },
  mounted: function() {
    console.log(this.$props.width);
    editor = monaco.editor.create(this.$refs.monacoEditor as HTMLElement, {
      value: code,
      language: "typescript",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      theme: "main"
    });
  },
  destroyed: function() {
    editor.getModel()?.dispose();
  },
  updated: function() {
    console.log("hej");
  }
})
export default class MonacoEditor extends Vue {}
</script>

<style scoped lang="less">
body {
  margin: 0;
}

.monaco-editor {
  height: 100%;
}
</style>
