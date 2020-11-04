<template>
  <v-container fluid class="grey lighten-4">
    <v-spacer></v-spacer>
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field
          background-color="grey lighten-4"
          solo
          label="点击选择视频文件路径"
          prepend-inner-icon="mdi-folder-plus"
        ></v-text-field>
      </v-col>
      <v-col cols="10">
        <v-text-field
          background-color="grey lighten-4"
          label="点击选择Excel文件路径"
          prepend-inner-icon="mdi-microsoft-excel"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      videoPath: "Hello Vue!",
      filePath: "FIlePath"
    };
  },
  methods: {}
};
</script>
