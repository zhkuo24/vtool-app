<template>
  <v-container fluid class="grey lighten-4">
    <v-row justify="center" class="mt-6">
      <v-col cols="8">
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              background-color="grey lighten-4"
              dense
              hide-details
              solo
              single-line
              label="视频文件路径"
              prepend-inner-icon="mdi-file-video"
              v-model="video_path"
              :class="video_isfinished"
            >
              <template v-slot:append-outer>
                <v-btn
                  style="top: -5px"
                  offset-y
                  color="primary"
                  fab
                  elevation="4"
                  width="35px"
                  height="35px"
                  @click="choose_video_path"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="12">
            <v-text-field
              background-color="grey lighten-4"
              dense
              hide-details
              solo
              single-line
              label="Excel文件路径"
              prepend-inner-icon="mdi-file-excel"
              v-model="exclefile_path"
              :class="file_isfinished"
              @blur="blur_test"
            >
              <template v-slot:append-outer>
                <v-btn
                  style="top: -5px"
                  offset-y
                  fab
                  elevation="4"
                  color="primary"
                  width="35px"
                  height="35px"
                  @click="choose_file_path"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-col cols="4">
            <v-btn outlined color="primary" disabled>
              <v-icon left>mdi-play-box</v-icon> 开始处理
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" :class="{ 'd-none': !isShow }" class="mt-6">
          <v-col cols="11">
            <v-text-field
              background-color="grey lighten-4"
              value="处理中..."
              flat
              outlined
              dense
              solo
              :append-icon="append_icon"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="1" class="  mt-n1 ml-n3">
            <v-progress-circular size="42" color="primary" value="30" width="4"
              ><div class="text-caption">1/45</div></v-progress-circular
            >
          </v-col>
        </v-row>
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
      exclefile_path: "",
      video_isfinished: "",
      file_isfinished: "",
      isShow: true,
      append_icon: "mdi-check-circle" //"mdi-spin mdi-loading"
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
    blur_test: function() {
      if (this.exclefile_path == "") {
        this.file_isfinished = "";
      } else {
        this.file_isfinished = "choose";
      }
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
            if (this.exclefile_path == "") {
              console.log("请输入值");
            }
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
.choose .theme--light.v-icon {
  color: #1976d2;
}

.v-input__append-inner .mdi.theme--light {
  color: #1976d2;
}

.btnrow {
  margin-left: 95px;
}
</style>
