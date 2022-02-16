<template>
  <div class="d-flex pa-2" style="gap:8px">
    <img :src="item.image" style="width:80px; height:80px;" />
    <div>
      <div>{{ item.text }}</div>
      <div class="d-flex" style="gap:5px">
        <v-chip
          @click="postByTag(tag)"
          v-for="(tag, index) in item.tags"
          :key="index"
          small
          label
        ># {{tag}}</v-chip>
      </div>
      <span @click="like(item)" style="cursor:pointer;">
        <span v-if="item.likes > 50">🧡</span>
        <span v-else-if="item.likes > 20">💛</span>
        <span v-else-if="item.likes > 10">💚</span>
        <span v-else>💙</span>
        <span>{{ item.likes }}</span>
      </span>
    </div>
    <div
      class="ml-auto"
      style="white-space:nowrap"
    >{{ item.owner.firstName }}, {{ item.owner.lastName }}</div>
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