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
            <v-sheet rounded="lg" min-height="268"></v-sheet>
          </v-col>

          <v-col cols="12" sm="8">
            <v-row
              min-height="70vh"
              rounded="lg"
              v-for="item in list"
              :key="item.id"
              class="d-flex pa-2 my-1"
              style="border:solid gray thin;"
            >
              <img :src="item.image" style="width:80px; height:80px;" />
              <v-col cols="7" class="d-flex flex-column py-0">
                <div>{{ item.text }}</div>
                <div class="d-flex" style="gap:5px">
                  <v-chip v-for="(tag, index) in item.tags" :key="index" small label>#{{tag}}</v-chip>
                </div>
                <div>
                  <span>🧡{{ item.likes }}</span>
                  <!-- <span>comment</span> -->
                </div>
              </v-col>
              <v-col cols="3" class="d-flex flex-column justify-end align-end">
                <span>{{ item.owner.lastName }}, {{ item.owner.firstName }}</span>
                <!-- <span>{{ item.publishDate }}</span> -->
              </v-col>
            </v-row>
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
export default {
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

