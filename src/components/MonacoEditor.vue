<template>
  <div ref="monacoEditor" class="monaco-editor" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as monaco from "monaco-editor";
import { insertText } from "../helpers/InsertText";
import { editorSnippet } from "../constants/Snippets";

@Component({
  props: ["width"]
})
export default class MonacoEditor extends Vue {
  private editor: monaco.editor.IStandaloneCodeEditor | undefined;

  @Watch("width")
  private onChangeWidth() {
    this.editor?.layout();
  }

  private drop(e: DragEvent) {
    if (this.editor) {
      const text = e.dataTransfer?.getData("text/plain") as string;
      const target = this.editor?.getTargetAtClientPoint(e.clientX, e.clientY);
      insertText(this.editor, text, [
        target?.position?.lineNumber ?? 0,
        target?.position?.column ?? 0
      ]);
    }
  }

  public mounted() {
    const monacoEditor = this.$refs.monacoEditor as HTMLElement;
    this.editor = monaco.editor.create(monacoEditor, {
      value: editorSnippet,
      language: "typescript",
      minimap: {
        enabled: false
      },
      automaticLayout: true,
      theme: "main"
    });

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
    monacoEditor.addEventListener("drop", this.drop);
    monacoEditor.addEventListener("dragover", e => e.preventDefault());
  }

  public destroyed() {
    this.editor?.getModel()?.dispose();
  }
}
</script>

<style scoped lang="less">
body {
  margin: 0;
}

.monaco-editor {
  margin-top: 40px;
  height: calc(100% - 40px);
}
</style>
