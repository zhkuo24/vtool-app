const xlsx = require("xlsx");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path"); // node内置模块。
const fs = require("fs");
// const performance = require("perf_hooks").performance;

// function get_timestamp() {
//   return ((performance.timeOrigin + performance.now()) / 1000) >> 0;
// }

function get_seconds(time_str) {
  let time_arr = null;
  let h = 0;
  let m = 0;
  let s = 0;
  let seconds = 0;
  time_arr = time_str.split(":");
  if (time_arr.length == 3) {
    h = parseInt(time_arr[0]);
    m = parseInt(time_arr[1]);
    s = parseInt(time_arr[2]);
    seconds = h * 60 * 60 + m * 60 + s;
  } else if (time_arr.length == 2) {
    m = parseInt(time_arr[0]);
    s = parseInt(time_arr[1]);
    seconds = m * 60 + s;
  } else {
    seconds = -1;
  }
  return seconds;
}

function read_xlsx(xlsx_path) {
  //workbook 对象，指的是整份 Excel 文档。我们在使用 js-xlsx 读取 Excel 文档之后就会获得 workbook 对象。
  let workbook = xlsx.readFile(xlsx_path);
  let worksheet = workbook.Sheets[workbook.SheetNames[0]];
  let data = xlsx.utils.sheet_to_json(worksheet);
  return data;
}

function video_cut(video_path, start_time, duration, out_file_path) {
  ffmpeg(video_path)
    .setStartTime(start_time)
    .setDuration(duration)
    .output(out_file_path)
    .videoCodec("libx264")
    .on("start", function(commandLine) {
      console.log("Spawned ffmpeg with command: " + commandLine);
    })
    .on("progress", function(progress) {
      console.log("processing: " + progress.timemark + "% done");
    })

    .on("end", function(err) {
      if (!err) {
        console.log("conversion Done");
      }
    })
    .on("error", function(err) {
      console.log("error: ", +err);
    })
    .run();
}

function start_cut_video(excel_file_path, video_fold) {
  // 读取 Excel 中的视频及剪切时间片段信息
  let crop_infos = read_xlsx(excel_file_path);
  let video_clip_nums = crop_infos.length;
  // let timestamp = get_timestamp();
  let result_path = video_fold + "-剪切结果";
  // 创建存放结果的文件
  console.log(result_path);
  // fs.mkdir(result_path, { recursive: true });
  fs.mkdir(result_path, { recursive: true }, err => {
    if (err) throw err;
  });
  crop_infos.forEach((crop_info, i) => {
    // 处理裁剪每个视频片段
    console.debug("第" + i + "个，一共" + video_clip_nums + "个 ");
    let fname = crop_info.FileName;
    let tmp_time_str = crop_info.Time;
    let clip = crop_info.Clip;
    let video_file_path = path.join(video_fold, fname);
    let times = tmp_time_str.split("-");
    let start_time = times[0];
    let end_time = times[1];
    let duration = get_seconds(end_time) - get_seconds(start_time);
    let out_file_path = path.join(
      result_path,
      crop_info.FileName.split(".")[0] + clip + ".mp4"
    );
    console.debug(video_file_path, start_time, duration, out_file_path);
    video_cut(video_file_path, start_time, duration, out_file_path);
  });
}

module.exports = {
  start_cut_video
};
