<template>
  <v-row justify="center">
    <v-col cols="12" sm="9">
      <v-sheet class="d-flex flex-column align-center pa-3">
        <img :src="item.image" style="width:auto; height:50vh" />
        <div class="d-flex justify-space-between" style="width:100%">
          <div>
            <h1>{{ item.text }}</h1>
            <div class="d-flex" style="gap:5px">
              <v-chip v-for="(tag, index) in item.tags" :key="index" label>{{ tag }}</v-chip>
              <span>💖 {{ item.likes }}</span>
            </div>
            <p class="mb-0">{{ item.publishDate.replace(/T/,' ').slice(0,16) }}</p>
            <a :href="item.link">{{item.link}}</a>
          </div>
          <div class="d-flex mt-3">
            <img :src="item.owner.picture" class="mr-2" style="width:100px; height:100px;" />
            <div>{{item.owner.title}}. {{item.owner.firstName}}, {{item.owner.lastName}}</div>
          </div>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: ["id"],
  data() {
    return {
      item: {}
    };
  },
  created() {
    this.$axios
      .get(`https://dummyapi.io/data/v1/post/${this.id}`, {
        headers: { "app-id": process.env.VUE_APP_API_KEY }
      })
      .then(response => {
        this.item = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
