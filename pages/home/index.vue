<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link v-if="user" class="nav-link" 
                :class="{
                  active: tab === 'your_feed'
                }" 
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'your_feed'
                  }
                }">
                  Your Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link " 
                :class="{
                  active: tab === 'global_feed'
                }" 
                exact
                :to="{
                  name: 'home',
                  query: {
                    tab: 'global_feed'
                  }
                }">
                  Global Feed
                </nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link v-if="tag" class="nav-link" 
                :class="{
                  active: tab === 'tag'
                }" 
                exact 
                :to="{
                  name: 'home',
                  query: {
                    tab: 'tag',
                    tag: tag
                  }
                }">
                  #{{ tag }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
                <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }" class="author">
                  {{ article.author.username }}
                </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
              :class="{
                active: article.favorited,
                disabled: article.favoritedDisabled
              }" 
              @click="onFavorite(article)">
                <i class="ion-heart"></i>
                {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <!-- 分页功能 -->
          <nav>
            <ul class="pagination" v-for="item in totalPage" :key="item">

              <li class="page-item" :class="{ active: item === page }">

                <!-- a标签,点击会刷新 -->
                <!-- <a class="page-link" :href="'?page='+item">{{ item }}</a> -->
                <nuxt-link class="page-link" :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }">
                  {{ item }}
                </nuxt-link>
              </li>
            </ul>
          </nav>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div v-for="tag in tags" :key="tag" class="tag-pill tag-default">
              <nuxt-link :to="{
                name:'home',
                query: {
                  tag: tag,
                  tab: 'tag'
                }
              }" class="tag-pill tag-default">
                {{ tag }}
              </nuxt-link>
              
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles, getFeedArticles,addFavorite, deleFavorite } from '../../pages/api/article';
import { getTags } from '../../pages/api/tag';
import { mapState } from 'vuex'

export default {

  name: 'HomeIndex',
  async asyncData({ query, store }) {
    //分页
    const limit = 20;
    const page = Number.parseInt(query.page || 1);
    //调文章的查询分页的服务
    // const { data } = await getArticles({
    //   limit,
    //   offset: (page - 1) * limit
    // })

    // const { data: tagData } = await getTags()

    const { tag } = query
    const tab = query.tab || 'global_feed'
    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
    //并发执行服务
    const [articlesRep, tagsRep] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesRep.data
    const { tags } = tagsRep.data

    articles.forEach(element => {
      element.favoritedDisabled = false
    });
    
    // console.log(data)

    return {
      articles: articles,
      articlesCount: articlesCount,
      page,
      limit,
      tags: tags,
      tag: tag,
      tab: tab
    }
  },
  watchQuery: ['page','tag','tab'],//监听页码的变化
  computed: {
    ...mapState(['user']),
    //总共的页数
    totalPage () {
      //分页,向上取整
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  methods: {
    async onFavorite (article) {

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

<style scoped lang="scss">

</style>
