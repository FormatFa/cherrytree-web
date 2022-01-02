<template>
  <div class="reader mx-sm-auto ma-8">
    <rich-text
      v-for="text in getRichTextList"
      :content="text.content"
      :attributes="text.attributes"
      :key="text.offset"
    ></rich-text>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import RichText, { RichTextData } from "./RichText.vue";
type TreeNode = {
  id: number;
  name: string;
  children: TreeNode[];
};
@Component({
  components: {
    RichText,
  },
})
export default class CherryReader extends Vue {
  @Prop({ type: String })
  private xmlContent: string | undefined;

  private showNav = true;
  private xmlParser = new DOMParser();

  get getRichTextList(): RichTextData[] {
    console.log("try parse node..");
    if (this.xmlContent == null || this.xmlContent == "") {
      return [];
    }
    console.log(this.xmlContent);
    let doc = this.xmlParser.parseFromString(
      this.xmlContent,
      "application/xml"
    );
    let texts = [];
    let rich_textList = doc.getElementsByTagName("rich_text");
    let i = 0;
    for (let element of rich_textList) {
      let attr: Record<string, string> = {};
      for (let attr_item of element.attributes) {
        if (attr_item.nodeValue != null) {
          attr[attr_item.name] = attr_item.nodeValue;
        }
      }
      texts.push({
        offset: i++,
        content: element.innerHTML,
        attributes: attr,
      });
    }
    return texts;
  }
}
</script>
<style scoped>
.reader {
  max-width: 700px;
}
</style>
