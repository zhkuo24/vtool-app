<template>
  <v-tabs grow background-color="grey lighten-4">
    <v-tab><v-icon left> mdi-content-cut</v-icon>视频裁剪</v-tab>
    <v-tab><v-icon left>mdi-crop-free</v-icon>智能裁边</v-tab>
    <v-tab-item> <Vcut /></v-tab-item>
    <v-tab-item><Vcrop /></v-tab-item>
  </v-tabs>
</template>

<script>
import Vcrop from "../components/Vcrop";
import Vcut from "../components/Vcut";
export default {
  components: {
    Vcut,
    Vcrop
  }
};
</script>
