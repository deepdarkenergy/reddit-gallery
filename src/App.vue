<template>
  <div id="app">
    <NavBar ref="navbar" class="navbar" v-on:search="onSearch" />
    <Gallary :search="searchText" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Gallary from './components/Gallary.vue';
import NavBar from './components/NavBar.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Gallary,
    NavBar,
  },
  data: function() {
    return {
      searchText: 'earthporn',
    }
  },
  methods: {
    onSearch(searchText:string) {
      this.searchText = searchText;
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
