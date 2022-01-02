<template>
  <div class="text-body-1 paragraph">{{ content }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export interface RichTextData {
  content: string;
  attributes: Record<string, string>;
}
export default Vue.extend({
  name: "RichText",
  props: {
    content: {
      type: String,
    },
    attributes: {
      type: Object,
    },
  },
});
</script>
<style scoped>
.paragraph {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>
