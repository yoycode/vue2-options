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
              <v-list-item-group>
                <v-list-item v-for="user in users" :key="user.id" @click="postByUser(user)">
                  <v-list-item-avatar>
                    <v-img :src="user.picture"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>{{user.firstName}}, {{user.lastName}}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
          <v-col cols="12" sm="9">
            <v-chip
              color="success"
              small
              label
              close
              @click:close="closeTag"
              class="mb-2"
              v-show="selectedTag"
            >{{selectedTag}}</v-chip>
            <v-sheet v-for="item in list" :key="item.id" outlined>
              <Post :item="item" @postByTag="list = $event" @selectedTag="selectedTag = $event" />
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
    users: [],
    list: [],
    selectedUser: "",
    selectedTag: ""
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
  },
  methods: {
    postByUser(user) {
      this.$axios
        .get(`https://dummyapi.io/data/v1/user/${user.id}/post`, {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        })
        .then(response => {
          this.list = response.data.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    closeTag() {
      this.$axios
        .get("https://dummyapi.io/data/v1/post", {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        })
        .then(response => {
          this.list = response.data.data;
          this.selectedTag = "";
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

