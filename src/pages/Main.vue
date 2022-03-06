<template>
  <v-row>
    <v-col cols="12" sm="3">
      <div v-for="user in users" :key="user.id" @click="postByUser(user)" class="user-wrapper">
        <img :src="user.picture" class="user-img" />
        <div>{{user.firstName}}, {{user.lastName}}</div>
      </div>
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
    <v-col cols="12" sm="3"></v-col>
  </v-row>
</template>
<script>
import Post from "../components/Post";
export default {
  name: "HomeComponent",
  components: {
    Post
  },
  data: () => ({
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
<style>
.user-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.user-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>