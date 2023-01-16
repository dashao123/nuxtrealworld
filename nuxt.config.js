/* 
    nuxt.js配置文件
*/

module.exports = {
    router: {
        linkActiveClass: 'active',//负责头部,点击,会高亮显示
        extendRoutes(routes, resolve) {
            //清空默认路由信息,重新配置
            routes.splice(0)
            /* console.log(routes) */

          routes.push(...[
            {
                path: '/',
                component: resolve(__dirname, 'pages/layout/'),
                children: [
                    {
                        path: '',
                        name:'home',
                        component: resolve(__dirname, 'pages/home/')
                    },
                    {//登录
                        path: '/login',
                        name:'login',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {//注册
                        path: '/register',
                        name:'register',
                        component: resolve(__dirname, 'pages/login/')
                    },
                    {//用户资料
                        path: '/profile/:username',
                        name:'profile',
                        component: resolve(__dirname, 'pages/profile/')
                    },
                    {//设置
                        path: '/settings',
                        name:'settings',
                        component: resolve(__dirname, 'pages/settings/')
                    },
                    {//创建文章
                        path: '/editor',
                        name:'editor',
                        component: resolve(__dirname, 'pages/editor/')
                    },
                    {//文章
                        path: '/article/:slug',
                        name:'article',
                        component: resolve(__dirname, 'pages/article/')
                    }

                ]
            }
          ])
        }
      }
}