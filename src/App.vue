<template>
  <v-app>
    <Navbar />
    <v-main class="grey lighten-4">
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },

  data: () => ({
    //
  })
};
</script>

<style></style>
