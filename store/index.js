//在服务端渲染期间运行的都是同一个实例
//为了防止数据冲突, 务必要把state定义为一个函数,返回数据对象
export const state = () => {
    return {
        //当前登录用户的状态
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}
const cookieparser = process.server ? require('cookieparser') : undefined
export const actions = {
    //nuxtServerInit 是一个特殊的action方法,
    //会在服务器渲染期间自动调用
    //作用: 初始化容器数据,传递数据给客户端使用
    nuxtServerInit ({commit},{req}) {
        let user = null
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (error) {
                
            }
            //提交mutations修改,state状态
            commit('setUser',user)

        }
    }
}



