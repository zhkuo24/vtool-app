<template>
  <v-container fluid class="grey lighten-4">
    <v-spacer></v-spacer>
    <v-row class="ml-12 mt-4">
      <v-col cols="9">
        <v-text-field
          background-color="grey lighten-4"
          outlined
          dense
          hide-details="false"
          label="视频文件路径"
          prepend-icon="mdi-folder-plus"
          v-model="video_path"
          @click="choose_video_path"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="ml-12">
      <v-col cols="9">
        <v-text-field
          background-color="grey lighten-4"
          outlined
          dense
          label="Excel文件路径"
          prepend-icon="mdi-microsoft-excel"
          v-model="exclefile_path"
          @click="choose_file_path"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="btnrow mt-n4" cols="2">
        <v-btn outlined color="primary" disabled>
          <v-icon left>mdi-play-box</v-icon> 开始
        </v-btn>
      </v-col>
      <v-col class="ml-1 mt-n6">
        <v-progress-circular size="48" color="primary" value="30" width="4"
          ><div class="text-caption">1/45</div></v-progress-circular
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { dialog } = require("electron").remote;

export default {
  data: function() {
    return {
      video_path: "",
      exclefile_path: ""
    };
  },
  methods: {
    choose_video_path: function() {
      dialog
        .showOpenDialog({
          title: "请选择视频文件夹",
          buttonLabel: "选择",
          properties: ["openDirectory"]
        })
        .then(result => {
          if (!result.canceled) {
            this.video_path = result.filePaths[0];
          }
        })
        .catch(err => {
          dialog.showErrorBox("出错啦", err);
        });
    },
    choose_file_path: function() {
      dialog
        .showOpenDialog({
          title: "请选择Excel文件",
          buttonLabel: "选择",
          properties: ["openFile"],
          filters: [{ name: "Excel", extensions: ["csv", "xlsx", "xls"] }]
        })
        .then(result => {
          if (!result.canceled) {
            this.exclefile_path = result.filePaths[0];
          }
        })
        .catch(err => {
          dialog.showErrorBox("出错啦", err);
        });
    }
  }
};
</script>

<style>
/* .row {
  margin-top: 18px;
} */
.btnrow {
  margin-left: 95px;
}
</style>
