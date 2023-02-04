<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-10 col-md-offset-1 col-xs-12">
                    <form>
                        <fieldset class="form-group">
                            <input type="text" required v-model="article.title" class="form-control form-control-lg"
                                placeholder="Article Title" />
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control" type="text" placeholder="What's this article about?" 
                                v-model="article.description" required >
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea class="form-control" rows="8"
                                placeholder="Write your post (in markdown)" 
                                v-model="article.body"
                                v-html="article.body" required ></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input type="text" class="form-control" v-model="newTag" placeholder="Enter tags" v-on:keyup.enter="enterTag" />
                            <div class="tag-list">
                                <span v-for="(tag,i) in article.tagList" class="tag-default tag-pill" :key="i">
                                    <i class="ion-close-round" @click="removeTag(i)"></i>
                                    {{tag}}
                                </span>
                            </div>
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right" 
                            :disabled="publishDisabled"
                            @click.prevent="publishArticle">
                            Publish Article
                        </button>
                    </form>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { getArticle,createArticle,updateArticle } from '../api/article'
export default {
    middleware: 'authenticated',
    name: 'EditorIndex',
    data() {
        return {
            newTag: '',
            publishDisabled: false,
            article: {
                title: "",
                description: "",
                body: "",
                tagList: []
            },
        }
    },
    computed: {
        slug () {
            return this.$route.params.slug
        }
    },
    mounted () {
        this.getArticle()
        
    },
    methods: {    
        async getArticle() {
            if (!this.slug) return 
            const { data } = await getArticle(this.slug);
            this.article = data.article

        },
        enterTag() {
            this.article.tagList.push(this.newTag)
            this.newTag = ''
        },
        removeTag(i) {
            this.article.tagList.splice(i, 1)
        },
        async publishArticle () {
            const {data} = this.slug ? 
            await updateArticle(this.slug,this.article) :
            await createArticle(this.article)
            this.publishDisabled = true
            if (data.article) {
                this.article = data.article
                this.$router.push({
                    name: 'article',
                    params: {
                        slug: this.article.slug
                    }
                })
            }
            this.publishDisabled = false
        }
    }

}
</script>

<style scoped lang="scss">

</style>
