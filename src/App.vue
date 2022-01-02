<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="showNav"
      :clipped="true"
      :hide-overlay="false"
      ref="drawer"
    >
      <v-treeview
        activatable
        :open-on-click="false"
        :items="getCurrentNavTree"
        @update:active="onClickNav"
      ></v-treeview>
      <!-- -->

      <template v-slot:append>
        <v-switch
          class="ml-3"
          v-model="isShowDebug"
          @change="onDebugSwitch"
          :label="`vConsole: ${isShowDebug.toString()}`"
        ></v-switch>
      </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="showNav = !showNav"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-file-input
        class="mt-4"
        placeholder="upload local ctb file"
        :hide-input="false"
        hint="upload a ctb file"
        truncate-length="15"
        @change="onUploadFile"
      ></v-file-input>
      <v-divider vertical></v-divider>
      <v-btn icon @click="isShowInputDialog = true"
        ><v-icon class="ml-2">mdi-cloud-download</v-icon></v-btn
      >
    </v-app-bar>

    <v-main>
      <v-overlay :value="isLoading">
        <v-progress-circular
          class="ma-auto"
          indeterminate
          color="primary"
        ></v-progress-circular
      ></v-overlay>

      <CherryReader :xmlContent="txt" :cherrytree="cherrytree" />

      <v-dialog v-model="isShowInputDialog">
        <v-card>
          <v-card-text>
            <v-text-field
              v-model="remoteUrl"
              label="load from url"
              hint="ctb file url"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="isShowInputDialog = false"
            >
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="loadFromUrl">
              Load
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
    <v-snackbar v-model="isShowErrorMsg">
      {{ errorMsg }}
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CherryReader from "@/components/CherryReader.vue";
import CherryTree from "./cherrytree/CherryTree";
import { CtbCherryTreeDao } from "./cherrytree/CtbCherryTreeDao";
import CherryNode from "./cherrytree/CherryNode";
import { VConsoleTool } from "./sql/VConsoleTool";
type TreeNode = {
  id: number;
  name: string;
  children: TreeNode[];
};
export default Vue.extend({
  name: "App",

  components: {
    CherryReader,
  },

  data: () => {
    return {
      isShowDebug: false,
      errorMsg: "",
      isShowErrorMsg: false,
      isShowInputDialog: false,
      isLoading: false,
      remoteUrl: "",
      txt: "",
      showNav: true,
      cherrytree: new CherryTree(),
    };
  },
  methods: {
    onDebugSwitch(): void {
      if (this.isShowDebug) {
        VConsoleTool.getVConsole().showSwitch();
      } else {
        VConsoleTool.getVConsole().hideSwitch();
      }
    },
    async onUploadFile(file: File) {
      if (!file.name.endsWith("ctb")) {
        this.showErrorMsg("please upload a .ctb file");
        return;
      }
      this.parseCtbFile(file);
    },
    async loadFromUrl(): Promise<void> {
      this.isShowInputDialog = false;
      this.isLoading = true;
      console.log("try load:" + this.remoteUrl);
      try {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", this.remoteUrl, true);
        xhr.responseType = "arraybuffer";

        xhr.onload = async (e) => {
          console.log(e);
          try {
            const uInt8Array = new Uint8Array(xhr.response);

            let cherrytreedao = new CtbCherryTreeDao(
              new Uint8Array(uInt8Array)
            );
            await this.cherrytree.init(cherrytreedao);
          } catch (e) {
            this.showErrorMsg("load file fail:" + e);
          }
          this.isLoading = false;
          this.showNav = true;
        };
        xhr.onerror = (e) => {
          console.log("load error", e);
          this.showErrorMsg("load fail!");

          this.isLoading = false;
        };

        xhr.send();
      } catch (e) {
        this.isLoading = false;

        console.log(e);
      }
    },
    async parseCtbFile(file: File): Promise<void> {
      // firefox version lower 68 not support arrayBuffer,https://caniuse.com/?search=blob.arraybuffer
      if (file.arrayBuffer == undefined) {
        this.showErrorMsg(
          "Current brower not support arrayBuffer() function,please try another!"
        );
        return;
      }
      console.log("upload file:", file);
      let cherrytreedao = new CtbCherryTreeDao(
        new Uint8Array(await file.arrayBuffer())
      );
      await this.cherrytree.init(cherrytreedao);
      this.showNav = true;
    },
    toTreeData(cherryNode: CherryNode): TreeNode {
      let result: TreeNode = {
        id: cherryNode.getNodeId(),
        name: cherryNode.getName(),
        children: [],
      };
      let children = [];
      for (let cherryItem of cherryNode.getChildren()) {
        let temp = this.toTreeData(cherryItem);
        children.push(temp);
      }
      result.children = children;

      return result;
    },
    onClickNav(item: number[]): void {
      if (item.length == 0) {
        return;
      }
      let node_id = item[0];
      let txt = this.cherrytree.getNodeTxtById(node_id);
      this.txt = txt;
    },
    showErrorMsg(msg: string): void {
      this.errorMsg = msg;
      this.isShowErrorMsg = true;
    },
  },
  computed: {
    getCurrentNavTree(): TreeNode[] {
      let treeData: TreeNode[] = [];
      if (this.cherrytree == null) {
        return treeData;
      }
      for (let cherryNode of this.cherrytree.getNodes()) {
        treeData.push(this.toTreeData(cherryNode));
      }
      return treeData;
    },
  },
});
</script>
<style scoped>
.console_switch {
}
</style>
