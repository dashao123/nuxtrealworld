<!-- 我的页面 -->
<template>
    <div class="row">

        <div class="col-md-8 col-md-offset-2">

            <div class="card">
                <div class="card-block">
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.
                    </p>
                </div>
                <div class="card-footer">
                    <a href="" class="comment-author">
                        <img :src="article.author.image" class="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">{{ article.author.username }}</a>
                    <span class="date-posted">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                </div>
            </div>

            <div class="card">
                <div class="card-block">
                    <p class="card-text">With supporting text below as a natural lead-in to additional content.
                    </p>
                </div>
                <div class="card-footer">
                    <a href="" class="comment-author">
                        <img :src="article.author.image" class="comment-author-img" />
                    </a>
                    &nbsp;
                    <a href="" class="comment-author">{{ article.author.username }}</a>
                    <span class="date-posted">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                    <span class="mod-options">
                        <i class="ion-edit"></i>
                        <i class="ion-trash-a"></i>
                    </span>
                </div>
            </div>

            <form class="card comment-form">
                <div class="card-block">
                    <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
                </div>
                <div class="card-footer">
                    <img :src="article.author.image" />
                    <button class="btn btn-sm btn-primary">
                        Post Comment
                    </button>
                </div>
            </form>

        </div>

    </div>
</template>

<script>
// 评论组件
export default {
    name: 'ArticleComment',
    //接受传过来的参数
    props: {
        article: {
            type: Object,
            require: true
        }
  }
}
</script>

<style lang='scss' scoped>

</style>
