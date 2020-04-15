<template>
  <div class="tutorial-wrapper">
    <button v-on:click="selectAll">select</button>
    <div class="tutorial" dragable="true">
      <u class="line-numbers">
        <li v-for="line in lineNumbers" v-bind:key="line">{{ line }}</li>
      </u>
      <div ref="code" class="code">{{ code }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import * as monaco from "monaco-editor";

const code = `
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }
`.trim();

@Component({
  components: {},
  data: function() {
    return {
      code,
      lineNumbers: code.split("\n").map((line, index) => index + 1)
    };
  },
  methods: {
    selectAll: function(e) {
      const selection = window.getSelection() as Selection;
      const range = document.createRange();
      range.selectNodeContents(this.$refs.code as HTMLElement);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
})
export default class MonacoEditor extends Vue {}
</script>

<style scoped lang="less">
.tutorial-wrapper {
  background: #ececec;
  padding: 8px 16px;

  .tutorial {
    display: flex;
    font-family: "Droid Sans Mono", monospace, monospace, "Droid Sans Fallback";

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
</style>
