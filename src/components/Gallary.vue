<template>
  <div>
    <span>Post Type:</span>
    <input type="checkbox" id="imagePost" v-model="includeImagePost" />
    <label for="imagePost">Image</label>
    <input type="checkbox" id="videoPost" v-model="includeVideoPost" />
    <label for="videoPost">Video</label>
    <input type="checkbox" id="textPost" v-model="includeTextPost" />
    <label for="textPost">Text</label>
    <div class="posts-container" v-if="filteredPosts.length > 0">
      <PostPreview
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
        v-on:click.native="onPreviewClick(post)"
      />
    </div>
    <div v-if="activePost">
      <PostDetail :post="activePost" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { getSubredditPosts } from "../utilities/DataService";
import PostPreview from "./PostPreview";
import PostDetail from "./PostDetail";
import Post from "../modals/AbstractPost";
import { RedditPostType } from "../modals/RedditPostType";
import _ from 'lodash';

export default Vue.extend({
  props: ["search"],
  data: function() {
    return {
      posts: [],
      activePost: null,
      includeImagePost: true,
      includeVideoPost: false,
      includeTextPost: false,
      loading: false,
      after: '',
    };
  },
  async mounted() {
    this.getPostsAsync();
    window.addEventListener('scroll', this.onScroll, {passive: true});
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    filteredPosts() {
      var vm = this;
      let results = [];
      if (this.posts) {
        this.posts.forEach(post => {
          if (
            vm.includeImagePost &&
            post.contentType === RedditPostType.Image
          ) {
            results.push(post);
          }
          if (
            vm.includeVideoPost &&
            post.contentType === RedditPostType.Video
          ) {
            results.push(post);
          }
          if (vm.includeTextPost && post.contentType === RedditPostType.Text) {
            results.push(post);
          }
        });
      }

      return results;
    }
  },
  methods: {
    onPreviewClick(post) {
      this.activePost = post;
    },
    async getPostsAsync() {
      this.loading = true;
      let response = await getSubredditPosts(this.search, this.after);
      if(response.success) {
        this.after = response.after;
        this.posts = this.posts.concat(response.posts);
      } else {
        //TODO: What?
      }
      this.loading = false;
    },
    onScroll: _.throttle(function() {
      let nearTheBottom = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight >= document.documentElement.offsetHeight - 1000;

      if(nearTheBottom && !this.loading) {
        this.getPostsAsync();
      }
    }, 1000)
  },
  components: {
    PostPreview,
    PostDetail
  },
  watch: {
    search(newVal) {
      this.after = '';
      this.posts = [];
      this.getPostsAsync();
    }
  }
});
</script>

<style scoped>
.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-auto-rows: 1fr;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  padding: 1rem;
}
</style>