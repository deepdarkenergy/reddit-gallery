<template>
  <div class="navbar">
    <input class="searchbox" type="text" placeholder="Search for subreddit..." v-model="searchText" />
    <button title="Search" @click="onSearchButtonClick()">Search</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      searchText: "",
    };
  },
  methods: {
    onSearchButtonClick() {
      this.$emit("search", this.searchText);
    }
  },
};
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;;
  background-color: yellow;
  width: 100%;
  height: 30px;
}

.searchbox{
    margin: 3px;
}
</style>