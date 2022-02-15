<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-avatar :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'" size="32"></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="link in links" :key="link">{{ link }}</v-tab>
      </v-tabs>

      <v-avatar class="hidden-sm-and-down" color="grey darken-1 shrink" size="32"></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg">여기에 태그</v-sheet>
          </v-col>
          <v-col cols="12" sm="8">
            <v-sheet v-for="item in list" :key="item.id" outlined>
              <Post :item="item" />
            </v-sheet>
          </v-col>
          <v-col cols="12" sm="2">
            <v-sheet rounded="lg" min-height="268"></v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Post from "./components/Post";
export default {
  components: {
    Post
  },
  data: () => ({
    links: ["Dashboard", "Messages", "Profile", "Updates"],
    list: []
  }),
  created() {
    this.$axios
      .get("https://dummyapi.io/data/v1/post", {
        headers: { "app-id": process.env.VUE_APP_API_KEY }
      })
      .then(response => {
        this.list = response.data.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>

