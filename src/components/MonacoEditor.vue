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

const insertTextAtPos = (
  instance: monaco.editor.IStandaloneCodeEditor,
  text: string,
  coords: [number, number] = [0, 0],
  placeCursor = false
) => {
  console.log(coords);
  const range = new monaco.Range(coords[0], coords[1], coords[0], coords[1]);
  if (placeCursor) {
    const selection = new (Selection as any)(
      coords[0],
      coords[1],
      coords[0],
      coords[1]
    );
    instance.executeEdits(
      "insert",
      [{ range, text, forceMoveMarkers: true }],
      [selection]
    );
    instance.focus();
  } else {
    console.log(range, text);
    instance.executeEdits("insert", [{ range, text, forceMoveMarkers: true }]);
  }
  instance.pushUndoStop();
};

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
    editor = monaco.editor.create(this.$refs.monacoEditor as HTMLElement, {
      value: code,
      language: "typescript",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      theme: "main"
      //dragAndDrop: true
    });

    (this.$refs.monacoEditor as HTMLElement).addEventListener("drop", e => {
      const text = e.dataTransfer?.getData("text/plain") as string;
      const target = editor.getTargetAtClientPoint(e.clientX, e.clientY);
      console.log("drop", text, target);
      insertTextAtPos(editor, text, [
        target?.position?.lineNumber ?? 0,
        target?.position?.column ?? 0
      ]);
    });
    (this.$refs.monacoEditor as HTMLElement).addEventListener("dragover", e =>
      e.preventDefault()
    );
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
  margin-top: 25px;
  height: calc(100% - 25px);
}
</style>
