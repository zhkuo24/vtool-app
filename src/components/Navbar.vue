<template>
  <nav>
    <v-app-bar app dense clipped-left color="grey lighten-4">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="pa-0">
        <v-avatar size="30" mb-4>
          <img src="../assets/logo.png" />
        </v-avatar>
        <span class="title">V<span class="font-weight-light">Tool</span></span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      app
      clipped
      color="grey lighten-4"
      :expand-on-hover="drawer"
      mini-variant-width="64"
      mobile-breakpoint="0"
      width="180"
      permanent
    >
      <v-list dense rounded nav>
        <v-list-item-group v-model="item" color="primary">
          <template v-for="(item, i) in items">
            <v-row v-if="item.heading" :key="i" align="center">
              <v-col cols="6">
                <v-subheader v-if="item.heading">
                  {{ item.heading }}
                </v-subheader>
              </v-col>
              <v-col cols="6" class="text-right">
                <v-btn small text>edit</v-btn>
              </v-col>
            </v-row>
            <v-divider
              v-else-if="item.divider"
              :key="i"
              dark
              class="my-4"
            ></v-divider>
            <v-list-item v-else :key="i" link :to="item.route">
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    snackbar: true,
    drawer: true,
    item: 5,
    items: [
      {
        icon: "mdi-content-cut",
        text: "视频裁剪",
        route: "/"
      },
      { icon: "mdi-robot", text: "深度学习", route: "/dl" },
      {
        icon: "mdi-tools",
        text: "工" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "具",
        route: "/tool"
      },
      { divider: true },
      {
        icon: "mdi-help-circle",
        text: "帮" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "助",
        route: "/help"
      },
      {
        icon: "mdi-information",
        text: "关" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + "于",
        route: "/about"
      }
    ]
    // items: [
    //   { icon: "mdi-lightbulb-outline", text: "工具" },
    //   { icon: "mdi-touch-app", text: "Reminders" },
    //   { divider: true },
    //   { heading: "Labels" },
    //   { icon: "add", text: "Create new label" },
    //   { divider: true },
    //   { icon: "archive", text: "Archive" },
    //   { icon: "delete", text: "Trash" },
    //   { divider: true },
    //   { icon: "settings", text: "Settings" },
    //   { icon: "chat_bubble", text: "Trash" },
    //   { icon: "help", text: "Help" },
    //   { icon: "phonelink", text: "App downloads" },
    //   { icon: "keyboard", text: "Keyboard shortcuts" }
    // ]
  })
};
</script>

<style>
#app .v-navigation-drawer__border {
  display: none;
}

.v-list-item--link::before {
  background-color: #2196f3 !important;
}
.theme--light.v-list-item:hover::before {
  opacity: 0.2 !important;
}
#app .v-list-item-content {
  text-align: center;
  width: 4em; /*这个值是看最长能显示几个文字，如x，则为x em*/
}
#app .v-list-item-title {
  letter-spacing: 2em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-2）/(2-1)=2em */
  margin-right: -2em; /*同上*/
}
#app .w3 {
  letter-spacing: 0.5em; /*如果需要y个字两端对齐，则为(x-y)/(y-1),这里是（4-3）/(3-1)=0.5em */
  margin-right: -0.5em; /*同上*/
}
</style>
