<template>
  <div class="d-flex pa-2" style="gap:8px">
    <img :src="item.image" style="width:80px; height:80px;" />
    <div>
      <div>{{ item.text }}</div>
      <div class="d-flex" style="gap:5px">
        <v-chip v-for="(tag, index) in item.tags" :key="index" small label>#{{tag}}</v-chip>
      </div>
      <div>🧡{{ item.likes }}</div>
    </div>
    <div
      class="ml-auto"
      style="white-space:nowrap"
    >{{ item.owner.firstName }}, {{ item.owner.lastName }}</div>
  </div>
</template>
<script>
export default {
  props: ["item"]
};
</script>