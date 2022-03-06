<template>
  <div class="post-wrapper">
    <img :src="item.image" class="post-thumbnail" />
    <div>
      <router-link :to="{name:'detail', params:{id: item.id}}">{{ item.text }}</router-link>
      <div class="post-tags">
        <v-chip
          @click="postByTag(tag)"
          v-for="(tag, index) in item.tags"
          :key="index"
          small
          label
        ># {{tag}}</v-chip>
      </div>
      <span @click="like(item)" class="post-like">
        <span v-if="item.likes > 50">🧡</span>
        <span v-else-if="item.likes > 20">💛</span>
        <span v-else-if="item.likes > 10">💚</span>
        <span v-else>💙</span>
        <span>{{ item.likes }}</span>
      </span>
    </div>
    <div class="post-owner">
      <v-img :src="item.owner.picture" class="post-owner-img" />
      <div>{{ item.owner.firstName }}, {{ item.owner.lastName }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    like(item) {
      this.$axios
        .put(
          `https://dummyapi.io/data/v1/post/${item.id}`,
          { likes: item.likes++ },
          { headers: { "app-id": process.env.VUE_APP_API_KEY } }
        )
        .then(() => {
          alert(`You like "${item.text}"`);
        })
        .catch(error => {
          console.error(error);
        });
    },
    postByTag(tag) {
      this.$emit("selectedTag", tag);
      this.$axios
        .get(`https://dummyapi.io/data/v1/tag/${tag}/post`, {
          headers: { "app-id": process.env.VUE_APP_API_KEY }
        })
        .then(response => {
          this.$emit("postByTag", response.data.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
<style>
.post-wrapper {
  display: flex;
  gap: 8px;
  padding: 8px;
}
.post-thumbnail {
  width: 80px;
  height: 80px;
}
.post-tags {
  display: flex;
  gap: 5px;
}
.post-like {
  display: flex;
  gap: 10px;
  cursor: pointer;
}
.post-owner {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto;
  white-space: nowrap;
}
.post-owner-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>