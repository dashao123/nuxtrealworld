<template>
    <div class="article-page">

        <div class="banner">
            <div class="container">

                <h1>{{ article.title }}</h1>

                <article-meta :article="article"/>

            </div>
        </div>

        <div class="container page">

            <div class="row article-content">
                <div class="col-md-12" v-html="article.body">
                    
                </div>
            </div>

            <hr />

            <div class="article-actions">
                <article-meta :article="article"/>
            </div>

            <!-- 评论区 -->
            <article-comment :article="article"/>
            

        </div>

    </div>
</template>

<script>
import { getArticle } from '../api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta'
import ArticleComment from './components/article-comment'

export default {
    name: 'ArticleIndex',
    async asyncData({ params }) {
        // console.log(params)
        const { data } = await getArticle(params.slug)
        const { article } = data
        const md = new MarkdownIt
        article.body = md.render(article.body)
        return {
            article: article
        }
    },
    components: {
        ArticleMeta,
        ArticleComment
    
    },
    //将标题展示在head中
    head() {
      return {
        title: `${this.article.title} - realworld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: 'My custom description'
          }
        ]
      }
    }
}
</script>

<style scoped lang="scss">

</style>
