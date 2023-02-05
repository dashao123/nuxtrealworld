<template>
    <div class="profile-page">

        <div class="user-info">
            <div class="container">
                <div class="row">

                    <div class="col-md-10 col-md-offset-1">
                        <img :src="profile.image" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>
                            {{ profile.bio }}
                        </p>
                        <template v-if="user&&user.username===profile.username">
                            <nuxt-link class="btn btn-sm btn-outline-secondary action-btn" 
                                to="/settings">
                                <i class="ion-gear-a"></i>
                                &nbsp;
                                Edit Profile Settings
                            </nuxt-link>
                        </template>
                        <template v-else>
                            <button class="btn btn-sm btn-outline-secondary action-btn" 
                                @click="onFollow(profile)">
                                <i class="ion-plus-round"></i>
                                &nbsp;
                                {{profile.following ?`Unfollow&nbsp;`:`Follow `}}
                                {{profile.username}}
                            </button>
                        </template>
                    </div>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-md-10 col-md-offset-1">
                    <div class="article-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link class="nav-link" 
                                    :to="{
                                        name:'profile',
                                        params: { 
                                            username 
                                        },
                                        query: {
                                            tab:'My'
                                        }
                                    }"
                                    :class="{ active: tab === 'My'}" 
                                    exact>
                                    My Articles
                                </nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link class="nav-link" 
                                    :to="{
                                        name:'profile',
                                        params: { 
                                            username 
                                        },
                                        query: {
                                            tab:'Favorited'
                                        }
                                    }"
                                    :class="{ active: tab === 'Favorited'}" 
                                    exact>
                                    MFavorited Articles
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                    <!-- 文章展示 -->
                    <div class="article-preview" v-for="article in articles" :key="article.slug">
                        <div class="article-meta">
                            <nuxt-link 
                            :to="{
                                name: 'profile',
                                params: {
                                    username: article.author.username
                                }
                            }">
                                <img :src="article.author.image" />
                            </nuxt-link>
                            <div class="info">
                                <a class="author" href="#">{{article.author.username}}</a>
                                <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
                            </div>
                            <button :disabled="article.favoriteDisabled" 
                                class="btn btn-sm pull-xs-right"
                                :class="article.favorited?'btn-primary':'btn-outline-primary'" 
                                @click="onFavorite(article)">
                                <i class="ion-heart"></i>
                                {{article.favoritesCount}}
                            </button>
                        </div>
                        <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
                            <h1>{{article.title}}</h1>
                            <p>{{article.description}}</p>
                            <span>Read more...</span>
                            <ul class="tag-list">
                                <li class="tag-default tag-pill tag-outline" v-for="(tag,i) in article.tagList" :key="i">{{tag}}</li>
                            </ul>
                        </nuxt-link>
                    </div>

                    
                    <!-- 分页 -->
                    <nav>
                        <ul class="pagination" v-for="item in totalPage" :key="item">
                    
                            <li class="page-item" :class="{ active: item === page }">
                    
                                <!-- a标签,点击会刷新 -->
                                <!-- <a class="page-link" :href="'?page='+item">{{ item }}</a> -->
                                <nuxt-link class="page-link" :to="{
                                    name: 'home',
                                    query: {
                                        page: item,
                                        tab: tab
                                    }
                                }">
                                    {{ item }}
                                </nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles,addFavorite, deleFavorite,addFollow,deleFollow } from '../../pages/api/article'
import { getProfiles } from '../../pages/api/profile'
export default {
    name: 'ProfileIndex',
    async asyncData(context) {
        //分页
        console.log(1121123)
        const { tab = "My", page = 1 } = context.query;
        const { username } = context.params;
        const limit = 10;
        const articleType = tab === "My" ? "author" : "favorited";
        //并发执行服务
        const [articlesRep, profilesRep] = await Promise.all([
            getArticles({
                limit,
                offset: (page - 1) * limit,
                [articleType]: username
            }),
            getProfiles(username)
        ])
        const { articles, articlesCount } = articlesRep.data
        const { profile } = profilesRep.data
        profile.followDisabled = false;
        articles.forEach((element) => (element.favoriteDisabled = false));
        
        return {
            tab,
            page,
            limit,
            profile,
            articles,
            articlesCount,
            username
        };
    },
    watchQuery: ['page', 'tab'],//监听页码的变化
    computed: {
        ...mapState(['user']),
        //总共的页数
        totalPage() {
            //分页,向上取整
            return Math.ceil(this.articlesCount / this.limit)
        }
    },
    methods: {
        async onFollow(profile) {
            if (!this.user) return this.$router.push("/login");
            profile.followDisabled = true; // 禁用点击
            if (profile.following) {
                // 取消关注
                await deleFavorite(profile.username);
                profile.following = false;
            } else {
                // 添加关注
                await addFollow(profile.username);
                profile.following = true;
            }
            profile.followDisabled = false; // 允许点击
        },
        async onFavorite(article) {
            if (!this.user) return this.$router.push("/login");
            article.favoriteDisabled = true; // 禁用点击
            if (article.favorited) {
                // 取消点赞
                await deleFavorite(article.slug);
                article.favorited = false;
                article.favoritesCount -= 1;
            } else {
                // 添加点赞
                await addFavorite(article.slug);
                article.favorited = true;
                article.favoritesCount += 1;
            }
            article.favoriteDisabled = false; // 允许点击
        }
    }
}
</script>

<style scoped lang="scss">

</style>
