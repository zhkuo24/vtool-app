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
              :disabled="video_path_disabled"
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
                  :disabled="path_btn_disabled"
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
              v-model="excelfile_path"
              :class="file_isfinished"
              :disabled="file_path_disabled"
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
                  :disabled="file_btn_disabled"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-col cols="4">
            <v-btn
              outlined
              color="primary"
              :disabled="start_btn_disabled"
              @click="start_process"
            >
              <v-icon left>mdi-play-box</v-icon> 开始处理
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" :class="{ 'd-none': !isShow }" class="mt-6">
          <v-col cols="11">
            <v-progress-linear :value="percent" height="15"
              >{{ Math.ceil(percent) }}%</v-progress-linear
            >
            <!-- <v-text-field
              background-color="grey lighten-4"
              v-model="process_info"
              dense
              solo
              :append-icon="append_icon"
              readonly
            ></v-text-field> -->
          </v-col>
          <v-col cols="1" class="  mt-n3 ml-n1">
            <v-progress-circular
              size="40"
              color="primary"
              :value="progress_percent"
              width="4"
              ><div class="text-caption">1/45</div></v-progress-circular
            >
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// const { dialog, fs, path } = require("electron").remote;
const remote = require("electron").remote;
const dialog = remote.dialog;

const { ipcRenderer } = require("electron");

const vcut = require("../main_process/video_cut");
export default {
  data() {
    return {
      video_path: "",
      excelfile_path: "",
      isShow: true,
      process_info: "处理中...",
      append_icon: "mdi-check-circle", //"mdi-spin mdi-loading"
      crop_infos: null,
      current_video_idx: 0,
      video_clip_nums: 0,
      cut_start_flag: false,
      cut_done_flag: false,
      result_path: "",
      progress_percent: 0,
      percent: 0
    };
  },
  created() {
    let self = this;
    ipcRenderer.on("cpu_info_reply", function(event, arg) {
      self.set_processinfo(arg);
    });
    ipcRenderer.on("video_cut_prepare_result", function(event, msg) {
      self.crop_infos = msg.crop_infos;
      self.video_clip_nums = msg.video_clip_nums;
      self.result_path = msg.result_path;
      self.current_video_idx = 0;
      let crop_info = self.crop_infos[self.current_video_idx];
      let video_cut_msg = vcut.generate_cut_msg(
        self.current_video_idx,
        self.video_path,
        self.result_path,
        crop_info
      );

      ipcRenderer.send("video_cut", video_cut_msg);
    });
    ipcRenderer.on("progress_msg", function(event, msg) {
      let done_flag = msg.done_flag;
      self.current_video_idx = msg.current_video_idx;
      if (self.current_video_idx >= self.video_clip_nums) {
        self.cut_start_flag = false;
        self.cut_done_flag = true;
      } else {
        if (done_flag) {
          self.percent = 0;
          this.progress_percent = Math.round(
            (self.current_video_idx / self.video_clip_nums) * 100
          );
          let crop_info = self.crop_infos[self.current_video_idx];
          let video_cut_msg = vcut.generate_cut_msg(
            self.current_video_idx,
            self.video_path,
            self.result_path,
            crop_info
          );
          ipcRenderer.send("video_cut", video_cut_msg);
        } else {
          //更新状态
          // console.log("progress_percent: ", msg.progress);
          self.percent = msg.progress;
        }
      }
    });
  },
  computed: {
    video_isfinished: {
      get() {
        return this.video_path == "" ? "" : "finish_video";
      },
      set() {}
    },
    file_isfinished: {
      get() {
        return this.excelfile_path == "" ? "" : "finish_file";
      },
      set() {}
    },
    start_btn_disabled: {
      get() {
        let flag1 = this.excelfile_path == "" || this.video_path == "";
        let flag2 = this.cut_start_flag;
        return flag1 || flag2 ? true : false;
      },
      set() {}
    },
    file_btn_disabled: {
      get() {
        return this.cut_start_flag ? true : false;
      },
      set() {}
    },
    file_path_disabled: {
      get() {
        return this.cut_start_flag ? true : false;
      },
      set() {}
    },
    video_path_disabled: {
      get() {
        return this.cut_start_flag ? true : false;
      },
      set() {}
    },
    path_btn_disabled: {
      get() {
        return this.cut_start_flag ? true : false;
      },
      set() {}
    }
  },
  methods: {
    start_process: function() {
      let msg = {
        video_path: "",
        excelfile_path: ""
      };
      this.isShow = true;
      msg.video_path = this.video_path;
      msg.excelfile_path = this.excelfile_path;
      this.cut_start_flag = true;
      this.cut_done_flag = false;
      ipcRenderer.send("video_cut_prepare", msg);
      this.progress_percent = 0;
      this.percent = 0;
    },

    set_processinfo(info) {
      this.process_info = info;
    },
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
            this.excelfile_path = result.filePaths[0];
            if (this.excelfile_path == "") {
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
.finish_file .mdi-file-excel {
  color: #1976d2;
}
.finish_video .mdi-file-video {
  color: #1976d2;
}

.v-input__append-inner .mdi.theme--light {
  color: #1976d2;
}
</style>
