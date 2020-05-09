<template>
    <div class="post-preview">
      <div class="content">
        <img v-if="isImagePost" :src="post.previewUrl" :alt="post.title" loading="lazy" />
        <iframe v-if="isVideoPost" :src="post.embedUrl" loading="lazy" />
      </div>
      <div class="footer">
        {{post.title}}
      </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { RedditPostType } from '../modals/RedditPostType'
import AbstractPost from '../modals/AbstractPost'

export default Vue.extend({
  props:{
    post: AbstractPost
  },
  computed: {
    isImagePost() {
      return this.post && this.post.contentType === RedditPostType.Image;
    },
    isVideoPost() {
      return this.post && this.post.contentType === RedditPostType.Video;
    },
    isLinkPost() {
      return this.post && this.post.contentType === RedditPostType.Link;
    },
    isTextPost() {
      return this.post && this.post.contentType === RedditPostType.Text;
    }
  }   
});
</script>

<style scoped>
.post-preview {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  text-align: center;
  background-color: #f1f1f1;
  transition: all 200ms;
  cursor: pointer;
  height: 400px;
}
.content {
  width: 100%;
  height: 80%;
}

.content > img {
  object-fit:cover;
  width: 100%;
  height: 100%;
}

.content > iframe {
  width: 100%;
  height: 100%;
}

</style>