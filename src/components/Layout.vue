<template>
  <div class="layout">
    <div ref="navigation" class="navigation">
      <div class="button-container">
        <button v-on:click="showEditor = !showEditor">Editor</button>
        <button v-on:click="showTutorial = !showTutorial">Tutorial</button>
      </div>
    </div>
    <div ref="windowContainer" class="window-container">
      <div v-show="showEditor" class="editor" ref="editor">editor</div>
      <div v-show="showTutorial" class="tutorial" ref="tutorial">tutorial</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Split from "split.js";

let verticalSplit: Split.Instance;
let windowSplit: Split.Instance;

const initializeWindowSplit = (editor: HTMLElement, tutorial: HTMLElement) => {
  windowSplit = Split([editor, tutorial], {
    direction: "horizontal",
    minSize: 200,
    sizes: [75, 25],
    snapOffset: 0
  });
};

@Component({
  components: {},
  data: function() {
    return {
      showEditor: true,
      showTutorial: true
    };
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
      snapOffset: 0
    });

    initializeWindowSplit(editor, tutorial);
  },
  updated: function() {
    const { showEditor, showTutorial } = this.$data;
    const editor = this.$refs.editor as HTMLElement;
    const tutorial = this.$refs.tutorial as HTMLElement;
    console.log(verticalSplit, windowSplit, this.$data);

    if (showEditor && showTutorial) {
      initializeWindowSplit(editor, tutorial);
    } else {
      windowSplit.destroy(true, false);
      editor.style.width = "";
      tutorial.style.width = "";
    }
  }
})
export default class Layout extends Vue {}
</script>

<style scoped lang="less">
.layout {
  height: 600px;
  width: 800px;
}

.navigation {
  padding: 8px 8px;
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
  display: flex;

  .editor {
    background: #ececec;
    width: 100%;
    //padding-right: 5px;
    //margin-right: -5px;
  }

  .tutorial {
    background: #d9d9da;
    width: 100%;
    //padding-left: 5px;
    //margin-left: -5px;
  }
}
</style>
