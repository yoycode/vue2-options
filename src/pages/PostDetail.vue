<template>
  <v-row justify="center">
    <v-col cols="12" sm="9">
      <div class="detail-container">
        <img :src="item.image" class="detail-main-img" />
        <div class="detail-content">
          <div>
            <h1>
              {{ item.text }}
              <v-chip v-if="comments.length > 0">{{comments.length}}</v-chip>
            </h1>
            <div class="detail-tags">
              <v-chip v-for="(tag, index) in item.tags" :key="index" label>{{ tag }}</v-chip>
              <span>💖 {{ item.likes }}</span>
            </div>
            <p>{{ dateFilter(item.publishDate) }}</p>
            <a :href="item.link">{{item.link}}</a>
          </div>
          <div class="detail-owner" v-if="item.owner">
            <img :src="item.owner.picture" class="detail-owner-img" />
            <div>{{item.owner.firstName}}, {{item.owner.lastName}}</div>
          </div>
        </div>
      </div>

      <div class="comment-wrapper" v-if="comments.length > 0">
        <div v-for="(comment,idx) in comments" :key="comment.id" class="comment">
          <div class="comment-content">
            <v-chip small label outlined>{{idx}}</v-chip>
            <span>{{ comment.message }}</span>
          </div>
          <div class="comment-info">
            <v-img :src="comment.owner.picture" class="comment-img" />
            <div class="comment-name">
              <span>{{comment.owner.title}}.{{comment.owner.firstName}}, {{comment.owner.lastName}}</span>
              <span>{{ dateFilter(comment.publishDate) }}</span>
            </div>
          </div>
        </div>
      </div>
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
<style>
.detail-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.detail-main-img {
  width: auto;
  height: 50vh;
}
.detail-content {
  display: flex;
  width: 100%;
}
.detail-tags {
  display: flex;
  gap: 5px;
}
.detail-owner {
  display: flex;
  margin-top: 20px;
}
.detail-owner-img {
  width: 100px;
  height: 100px;
}

.comment-wrapper {
  margin-top: 12px;
  width: 100%;
}
.comment {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
}
.comment-content {
  display: flex;
}
.comment-info {
  display: flex;
  justify-content: "flex-end";
}
.comment-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.comment-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>