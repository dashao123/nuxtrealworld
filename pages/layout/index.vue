<template>
  <div>
    <!-- 顶部导航栏 -->
    <nav class="navbar navbar-light">
      <div class="container">
        <!-- <a class="navbar-brand" href="index.html">conduit</a> -->
        <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <!-- <a class="nav-link active" href="">Home</a> -->
            <nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
          </li>
          <template v-if="user">
            <li class="nav-item">
              <!-- <a class="nav-link active" href="">
              <i class="ion-compose"></i>&nbsp;New Post
            </a> -->
              <nuxt-link class="nav-link " to="/editor">
                <i class="ion-compose"></i>&nbsp;New Post
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link active" href="">
              <i class="ion-gear-a"></i>&nbsp;Settings
            </a> -->
              <nuxt-link class="nav-link " to="/settings">
                <i class="ion-gear-a"></i>&nbsp;Settings
              </nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" :to="{
                name: 'profile',
                params: {
                  username: user.username
                }
              }">
                <img class="user-pic" :src="user.image">
                {{user.username}}
              </nuxt-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="javascript:;" @click.prevent="logout">Logout</a>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <nuxt-link class="nav-link " to="/login">
                Sign in
              </nuxt-link>
            </li>
            <li class="nav-item">
              <!-- <a class="nav-link active" href=""> Sign up </a> -->
              <nuxt-link class="nav-link " to="/register">
                Sign up
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <!-- /顶部导航栏 -->

    <!-- 子路由 -->
    <nuxt-child />
    <!-- /子路由 -->

    <!-- 底部 -->
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed
          under MIT.
        </span>
      </div>
    </footer>
    <!-- /底部 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
const Cookie = process.client ? require("js-cookie") : "";
export default {
  name: 'LayoutIndex',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      // 删除客户端缓存数据
      this.$store.commit("setUser", null);
      // 删除服务端数据持久化
      Cookie.set("user", null);
      this.$router.push("/");
    }
  }

}
</script>

<style scoped lang="scss">

</style>
