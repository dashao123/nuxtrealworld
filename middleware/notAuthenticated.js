//中间件,如果登录,就回到首页
export default function ({store, redirect}) {
    if (store.state.user) {
        return redirect('/')
    }
}