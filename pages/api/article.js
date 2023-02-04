import { request } from '@/plugins/request'
//获取公共文章列表
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles',
        params
    })
}

//获取关注用户文章列表
export const getFeedArticles = params => {
    return request({
        method: 'GET',
        url: '/api/articles/feed',
        params
    })
}

//点赞
export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`

    })
}
//删除点赞
export const deleFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`

    })
}

//获取文章详情
export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`

    })
}

//获取评论
export const getComments = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}/comments`

    })
}

//评论文章
export const addComments = (slug, body) => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/comments`,
        data: {'comment': {body}}
    })
}

//删除评论文章
export const deleComments = (slug, id) => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/comments/${id}`

    })
}

//关注
export const addFollow = (username) => {
    return request({
        method: 'POST',
        url: `/api/profiles/${username}/follow`

    })
}

//取消关注
export const deleFollow = (username) => {
    return request({
        method: 'DELETE',
        url: `/api/profiles/${username}/follow`

    })
}

// 发表文章
export const createArticle = data => {
    return request({
        method: 'POST',
        url: '/api/articles',
        data
    })
}
  
  // 删除文章
export const deleArticle = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}`,
    })
}
// 更新文章详情
export const updateArticle = (slug, data) => {
    return request({
        method: 'PUT',
        url: `/api/articles/${slug}`,
        data
    })
}