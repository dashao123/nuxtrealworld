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
    <sapn v-if="!isLoginUser">
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
    </sapn>
    <span v-else>
      <nuxt-link
        :to="{
          name:'editor',
          params:{
            slug:article.slug
        }}"
        exact
        class="btn btn-sm btn-outline-secondary"
      >
        <i class="ion-edit"></i>&nbsp;Edit Article
      </nuxt-link>
      <button 
        :disabled="article.deleDisabled" class="btn btn-outline-danger btn-sm" 
        @click.prevent="deleArticle(article)">
        <i class="ion-trash-a"></i>&nbsp;Delete Article
      </button>
    </span>
  </div>
</template>

<script>

import { addFollow, deleFollow, addFavorite, deleFavorite,deleArticle } from '../../api/article'
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
    ...mapState(['user']),
    //是否为登录人的文章
    isLoginUser () {
      return this.article.author.username === this.user?.username
    }
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
    },
    //删除自己的文章
    async deleArticle(article) {
      article.deleDisabled = true
      await deleArticle(article.slug)
      console.log(this.$router)
      this.$router.push('/')
      article.deleDisabled = false
    }

  }
}
</script>
