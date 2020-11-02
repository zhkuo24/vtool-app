<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field
        v-model="videoPath"
      label="请选择视频文件夹"

      @click="myclick"
      :readonly="readonly"
          
          
        ></v-text-field>
      </v-col>
      <v-col cols="10">
        <v-text-field v-model="filePath"
          label="请选择Excel文件"> </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
     videoPath: "",
     filePath: "",
     readonly:false
      
    };
  },
  methods: {
    myclick: function() {
      this.readonly = true
      console.log("点击")
// placeholder = "ddddd";
// this.videoPath = "ddd"

    }
  }
};
</script>
