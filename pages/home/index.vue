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
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
                :class="{
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
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <a href="" class="label label-pill label-default">programming</a>
              <a href="" class="label label-pill label-default">javascript</a>
              <a href="" class="label label-pill label-default">angularjs</a>
              <a href="" class="label label-pill label-default">react</a>
              <a href="" class="label label-pill label-default">mean</a>
              <a href="" class="label label-pill label-default">node</a>
              <a href="" class="label label-pill label-default">rails</a>
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
  async asyncData ( { query } ) {
    //分页
    const limit = 1;
    const page = Number.parseInt(query.page || 1);
    const { data } = await getArticles({
      limit,
      offset: (page - 1) * limit
    })
    // console.log(11111)
    // console.log(data)
    
    return {
      articles: data.articles,
      articlesCount: data.articlesCount
    }
    
  }

  
}
</script>

<style scoped lang="scss">

</style>
