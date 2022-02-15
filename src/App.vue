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
          <v-col cols="12" sm="3">
            <v-list>
              <v-list-item v-for="tag in users" :key="tag.id">
                <v-list-item-avatar>
                  <v-img :src="tag.picture"></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{tag.firstName}}, {{tag.lastName}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col cols="12" sm="9">
            <v-sheet v-for="item in list" :key="item.id" outlined>
              <Post :item="item" />
            </v-sheet>
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
    list: [],
    users: []
  }),
  created() {
    this.$axios
      .all([
        this.$axios.get("https://dummyapi.io/data/v1/post", {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        }),
        this.$axios.get("https://dummyapi.io/data/v1/user", {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        })
      ])
      .then(
        this.$axios.spread((post, user) => {
          this.list = post.data.data;
          this.users = user.data.data;
        })
      )
      .catch(
        this.$axios.spread((post_err, user_err) => {
          console.error(post_err);
          console.error(user_err);
        })
      );
  }
};
</script>

