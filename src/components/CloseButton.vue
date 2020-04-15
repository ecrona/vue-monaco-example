<template>
  <div class="close-button">
    <button @click="onClose">x</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  props: {
    onClose: { type: Function }
  }
})
export default class CloseButton extends Vue {}
</script>

<style scoped lang="less">
.close-button {
  z-index: 1;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
