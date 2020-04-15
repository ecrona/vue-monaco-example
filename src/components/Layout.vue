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
import { Component, Prop, Vue } from "vue-property-decorator";
import Split from "split.js";
import MonacoEditor from "./MonacoEditor.vue";
import Tutorial from "./Tutorial.vue";
import CloseButton from "./CloseButton.vue";

let verticalSplit: Split.Instance;
let windowSplit: Split.Instance;

const initializeWindowSplit = (
  editor: HTMLElement,
  tutorial: HTMLElement,
  onDrag: () => void
) => {
  windowSplit = Split([editor, tutorial], {
    direction: "horizontal",
    minSize: 200,
    sizes: [60, 40],
    snapOffset: 0,
    gutterStyle: (a, b) => ({
      background: "#d9d9da",
      [a]: `${b}px`
    }),
    onDrag
  });
};

@Component({
  components: {
    MonacoEditor,
    Tutorial,
    CloseButton
  },
  data: function() {
    return {
      showEditor: true,
      showTutorial: true,
      editorWidth: 0,
      editorHeight: 0
    };
  },
  watch: {
    showEditor: function() {
      const { showEditor, showTutorial } = this.$data;
      const editor = this.$refs.editor as HTMLElement;
      const tutorial = this.$refs.tutorial as HTMLElement;
      console.log(verticalSplit, windowSplit, this.$data);

      if (showEditor && showTutorial) {
        initializeWindowSplit(editor, tutorial, () => {
          this.$data.editorWidth = editor.clientWidth;
        });
      } else {
        windowSplit.destroy(true, false);
        editor.style.width = "";
        tutorial.style.width = "";
      }

      setTimeout(() => (this.$data.editorWidth = editor.clientWidth));
    },
    showTutorial: function() {
      const { showEditor, showTutorial } = this.$data;
      const editor = this.$refs.editor as HTMLElement;
      const tutorial = this.$refs.tutorial as HTMLElement;
      console.log(verticalSplit, windowSplit, this.$data);

      if (showEditor && showTutorial) {
        initializeWindowSplit(editor, tutorial, () => {
          this.$data.editorWidth = editor.clientWidth;
        });
      } else {
        windowSplit.destroy(true, false);
        editor.style.width = "";
        tutorial.style.width = "";
      }

      setTimeout(() => (this.$data.editorWidth = editor.clientWidth));
    }
  },
  methods: {
    toggleEditor: function() {
      this.$data.showEditor = !this.$data.showEditor;
    },
    toggleTutorial: function() {
      this.$data.showTutorial = !this.$data.showTutorial;
    }
  },
  mounted: function() {
    const navigation = this.$refs.navigation as HTMLElement;
    const windowContainer = this.$refs.windowContainer as HTMLElement;
    const editor = this.$refs.editor as HTMLElement;
    const tutorial = this.$refs.tutorial as HTMLElement;

    verticalSplit = Split([navigation, windowContainer], {
      direction: "vertical",
      minSize: [20, 200],
      sizes: [5, 95],
      gutterSize: 10,
      snapOffset: 0,
      gutterStyle: (a, b) => ({
        background: "#afb0b0",
        [a]: `${b}px`
      }),
      onDrag: () => {
        this.$data.editorHeight = editor.clientHeight;
      }
    });

    initializeWindowSplit(editor, tutorial, () => {
      this.$data.editorWidth = editor.clientWidth;
    });
  },
  destroyed: function() {
    verticalSplit.destroy(true, false);
    windowSplit.destroy(true, false);
  }
})
export default class Layout extends Vue {}
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
