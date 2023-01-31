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
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <div class="post-preview" v-for="article in articles" :key="article.slug">
            <div class="post-meta">
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
                <span class="date">{{ article.createdAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{
                active: article.favorited
              }">
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

              <li class="page-item" :class={ active: item===page }>

                <!-- a标签,点击会刷新 -->
                <!-- <a class="page-link" :href="'?page='+item">{{ item }}</a> -->
                <nuxt-link class="page-link" :to="{
                  name: 'home',
                  query: {
                    page: item
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

            <div class="tag-list">
              <a href="" class="tag-pill tag-default">javascript</a>
              <a href="" class="tag-pill tag-default">angularjs</a>
              <a href="" class="tag-pill tag-default">react</a>
              <a href="" class="tag-pill tag-default">mean</a>
              <a href="" class="tag-pill tag-default">node</a>
              <a href="" class="tag-pill tag-default">rails</a>
              <a href="" class="tag-pill tag-default">programming</a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { getArticles } from '../../pages/api/article';
export default {

  name: 'HomeIndex',
  async asyncData({ query }) {
    //分页
    const limit = 20;
    const page = Number.parseInt(query.page || 1);
    //调文章的查询分页的服务
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    // console.log(11111)
    // console.log(data)

    return {
      articles: data.articles,
      articlesCount: data.articlesCount,
      page,
      limit
    }
  },
  watchQuery: ['page'],//监听页码的变化
  computed: {
    //总共的页数
    totalPage () {
      //分页,向上取整
      return Math.ceil(this.articlesCount / this.limit)
    }
  }


}
</script>

<style scoped lang="scss">

</style>
