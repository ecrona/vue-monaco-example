<template>
  <div class="tutorial-wrapper">
    <div class="tutorial-container">
      <button v-on:click="selectAll">select</button>
      <div class="tutorial" dragable="true">
        <u class="line-numbers">
          <li v-for="line in lineNumbers" v-bind:key="line">{{ line }}</li>
        </u>
        <div ref="code" class="code">{{ code }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as monaco from "monaco-editor";
import { tutorialSnippet } from "../constants/Snippets";

@Component({})
export default class MonacoEditor extends Vue {
  public data() {
    return {
      code: tutorialSnippet,
      lineNumbers: tutorialSnippet.split("\n").map((line, index) => index + 1)
    };
  }

  public selectAll() {
    const selection = window.getSelection() as Selection;
    const range = document.createRange();
    range.selectNodeContents(this.$refs.code as HTMLElement);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
</script>

<style scoped lang="less">
.tutorial-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  overflow-x: auto;

  .tutorial-container {
    width: 100%;
    background: #ececec;
    padding: 8px 16px;
    margin: 0 16px;

    .tutorial {
      display: flex;
      font-family: "Droid Sans Mono", monospace, monospace,
        "Droid Sans Fallback";

      .line-numbers {
        list-style-type: none;
        text-decoration: none;
        margin-top: 1px;
        margin-right: 24px;
        color: #bfc0c0;
      }

      .code {
        white-space: pre;
        color: #b55f99;
      }
    }
  }
}
</style>
