//中间件,如果没有登录,跳转到登录页面
export default function ({store},{redirect}) {
    if (!store.state.user) {
        return redirect('/login')
    }
}