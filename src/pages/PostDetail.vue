<template>
  <v-row justify="center">
    <v-col cols="12" sm="9">
      <v-sheet class="d-flex flex-column align-center pa-3">
        <img :src="item.image" style="width:auto; height:50vh" />
        <div class="d-flex justify-space-between" style="width:100%">
          <div>
            <h1>
              {{ item.text }}
              <v-chip v-if="comments.length > 0">{{comments.length}}</v-chip>
            </h1>
            <div class="d-flex" style="gap:5px">
              <v-chip v-for="(tag, index) in item.tags" :key="index" label>{{ tag }}</v-chip>
              <span>💖 {{ item.likes }}</span>
            </div>
            <p class="mb-0">{{ dateFilter(item.publishDate) }}</p>
            <a :href="item.link">{{item.link}}</a>
          </div>
          <div class="d-flex mt-3" v-if="item.owner">
            <img :src="item.owner.picture" class="mr-2" style="width:100px; height:100px;" />
            <div>{{item.owner.firstName}}, {{item.owner.lastName}}</div>
          </div>
        </div>
      </v-sheet>
      <v-list class="mt-3" v-if="comments.length > 0">
        <v-list-item-group>
          <v-list-item v-for="(comment,idx) in comments" :key="comment.id">
            <v-list-item-content>
              <v-list-item-title>
                <v-chip small label outlined class="mr-2">{{idx}}</v-chip>
                <span>{{ comment.message }}</span>
              </v-list-item-title>
            </v-list-item-content>
            <div class="d-flex justify-end">
              <v-list-item-avatar>
                <v-img :src="comment.owner.picture"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="d-flex">
                  <div class="d-flex flex-column align-end">
                    <span>{{comment.owner.title}}.{{comment.owner.firstName}}, {{comment.owner.lastName}}</span>
                    <span>{{ dateFilter(comment.publishDate) }}</span>
                  </div>
                </v-list-item-title>
              </v-list-item-content>
            </div>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      item: {},
      comments: []
    };
  },
  created() {
    this.$axios
      .all([
        this.$axios.get(`https://dummyapi.io/data/v1/post/${this.id}`, {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        }),
        this.$axios.get(`https://dummyapi.io/data/v1/post/${this.id}/comment`, {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        })
      ])
      .then(
        this.$axios.spread((detail, comment) => {
          this.item = detail.data;
          this.comments = comment.data.data;
        })
      )
      .catch((detail_err, comment_err) => {
        console.error(detail_err);
        console.error(comment_err);
      });
  },
  methods: {
    dateFilter(v) {
      if (v) {
        return v.replace(/[T]/, " ").slice(0, 16);
      }
    }
  }
};
</script>
