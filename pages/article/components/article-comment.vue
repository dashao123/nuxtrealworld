<!-- 我的页面 -->
<template>
    <div class="row">

        <div class="col-md-8 col-md-offset-2">

            <form class="card comment-form">
                <div class="card-block">
                    <textarea v-model="body" class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                    <!-- 当前登录让你的头像 -->
                    <img :src="user.image" class="comment-author-img"/>
                    <button class="btn btn-sm btn-primary" @click.prevent="postComment">
                        Post Comment
                    </button>
                </div>
            </form>

            <div class="card" v-for="comment in comments" :key="comment.id">
                <div class="card-block">
                    <p class="card-text">{{ comment.body }}
                    </p>
                </div>
                <div class="card-footer">
                    <nuxt-link 
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }" class="comment-author">
                        <img :src="comment.author.image" class="comment-author-img" />
                    </nuxt-link>
                    &nbsp;
                    <nuxt-link class="comment-author" 
                    :to="{
                        name: 'profile',
                        params: {
                            username: comment.author.username
                        }
                    }">
                        {{ comment.author.username }}
                    </nuxt-link>
                    <span class="date-posted">{{ comment.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { getComments,addComments } from '../../api/article'
// 评论组件
export default {
    name: 'ArticleComment',
    //接受传过来的参数
    props: {
        article: {
            type: Object,
            require: true
        },
        user: {
            type: Object,
            require: true
        }
    },
    data () {
        return {
            comments: [],
            body: ''
        }
    },
    async mounted () {//客户端渲染  不通过SEO
        const { data } = await getComments(this.article.slug)
        //console.log(data)
        this.comments = data.comments
    },
    methods: {
        //评论
        async postComment (slug, body) {
            if (body !== '') {
                console.log(this.body)
                const {data} = await addComments(this.article.slug, this.body)
                console.log(data)
            }
        }
    }

}
</script>

<style lang='scss' scoped>

</style>
