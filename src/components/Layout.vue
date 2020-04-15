<template>
  <div class="layout">
    <div ref="navigation" class="navigation">
      <div class="button-container">
        <button @click="toggleEditor">Editor</button>
        <button @click="toggleTutorial">Tutorial</button>
      </div>
    </div>
    <div ref="windowContainer" class="window-container">
      <div v-show="showEditor" class="editor" ref="editor">
        <CloseButton :onClose="toggleEditor" />
        <MonacoEditor :width="editorWidth" :height="editorHeight" />
      </div>
      <div v-show="showTutorial" class="tutorial" ref="tutorial">
        <CloseButton :onClose="toggleTutorial" />
        <Tutorial />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Split from "split.js";
import { throttle, debounce } from "throttle-debounce";
import MonacoEditor from "./MonacoEditor.vue";
import Tutorial from "./Tutorial.vue";
import CloseButton from "./CloseButton.vue";

@Component({
  components: {
    MonacoEditor,
    Tutorial,
    CloseButton
  }
})
export default class Layout extends Vue {
  private verticalSplit: Split.Instance | undefined;
  private windowSplit: Split.Instance | undefined;

  constructor() {
    super();
    this.setEditorWidth = throttle(20, this.setEditorWidth);
    this.setEditorHeight = throttle(20, this.setEditorHeight);
  }

  private setEditorWidth() {
    this.$data.editorWidth = this.getRefs().editor.clientWidth;
  }

  private setEditorHeight() {
    this.$data.editorHeight = this.getRefs().editor.clientHeight;
  }

  private getRefs() {
    const { navigation, windowContainer, editor, tutorial } = this.$refs;
    return {
      navigation: navigation as HTMLElement,
      windowContainer: windowContainer as HTMLElement,
      editor: editor as HTMLElement,
      tutorial: tutorial as HTMLElement
    };
  }

  private initializeWindowSplit() {
    const { editor, tutorial } = this.getRefs();

    this.windowSplit = Split([editor, tutorial], {
      direction: "horizontal",
      minSize: 200,
      sizes: [60, 40],
      snapOffset: 0,
      gutterStyle: (a, b) => ({
        background: "#d9d9da",
        [a]: `${b}px`
      }),
      onDrag: this.setEditorWidth
    });
  }

  @Watch("showEditor")
  @Watch("showTutorial")
  private onChangeShowWindows() {
    const { showEditor, showTutorial } = this.$data;
    const { editor, tutorial } = this.getRefs();

    if (showEditor && showTutorial) {
      this.initializeWindowSplit();
    } else {
      if (this.windowSplit) {
        this.windowSplit.destroy(true, false);
        this.windowSplit = undefined;
      }

      editor.style.width = "";
      tutorial.style.width = "";
    }

    setTimeout(this.setEditorWidth);
  }

  public data() {
    return {
      showEditor: true,
      showTutorial: true,
      editorWidth: 0,
      editorHeight: 0
    };
  }

  public toggleEditor() {
    this.$data.showEditor = !this.$data.showEditor;
  }

  public toggleTutorial() {
    this.$data.showTutorial = !this.$data.showTutorial;
  }

  public mounted() {
    const { navigation, windowContainer, editor, tutorial } = this.getRefs();

    this.verticalSplit = Split([navigation, windowContainer], {
      direction: "vertical",
      minSize: [20, 200],
      sizes: [5, 95],
      gutterSize: 10,
      snapOffset: 0,
      gutterStyle: (a, b) => ({
        background: "#afb0b0",
        [a]: `${b}px`
      }),
      onDrag: this.setEditorHeight
    });

    this.initializeWindowSplit();
  }

  public destroyed() {
    this.verticalSplit?.destroy(true, false);
    this.windowSplit?.destroy(true, false);
  }
}
</script>

<style scoped lang="less">
.layout {
  height: 600px;
  width: 1200px;
}

.navigation {
  padding: 10px 10px;
  padding-bottom: 0;
  background: #afb0b0;

  .button-container {
    display: flex;
    align-items: flex-end;
    height: 100%;

    button {
      margin: 0 8px;
    }
  }
}

.window-container {
  position: relative;
  display: flex;
  overflow-y: hidden;

  .editor {
    position: relative;
    background: #ececec;
    width: 100%;
  }

  .tutorial {
    position: relative;
    width: 100%;
    background: #d9d9da;
    padding: 10px;
    padding-left: 0;
  }
}
</style>
