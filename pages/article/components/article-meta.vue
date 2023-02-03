<!-- 我的页面 -->
<template>
  <div class="article-meta">

    <a href=""><img :src="article.author.image" /></a>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">

      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{
      active: article.author.following
    }" :disabled="article.followDisabled" @click="followFavorite(article)">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? `Unfollow&nbsp;` : `Follow ` }} {{ article.author.username }}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{
      active: article.favorited
    }" :disabled="article.favoritedDisabled" @click="onFavorite(article)">
      <i class="ion-heart"></i>
      &nbsp;
      {{ article.favorited ? `Unfavorite Article&nbsp;` : `Favorite Article` }}
      <span v-if="article.favoritesCount > 0" class="counter">({{ article.favoritesCount }})</span>
    </button>
  </div>
</template>

<script>

import { addFollow, deleFollow, addFavorite, deleFavorite } from '../../api/article'
import { mapState } from 'vuex'

export default {
  name: 'ArtivleMeta',
  //接受传过来的参数
  props: {
    article: {
      type: Object,
      require: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async followFavorite(article) {
      if (!this.user) {
        return this.$router.push('/login')
      }
      article.followDisabled = true
      if (article.author.following) {
        await deleFollow(article.author.username) //不关注

        article.author.following = false

      } else {
        await addFollow(article.author.username)//关注

        article.author.following = true
      }
      article.followDisabled = false

    },
    async onFavorite(article) {

      if (!this.user) {
        return this.$router.push('/login')
      }

      //点赞的过程中，不能再操作了
      article.favoritedDisabled = true
      if (article.favorited) {
        await deleFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1

      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoritedDisabled = false
    }

  }
}
</script>
