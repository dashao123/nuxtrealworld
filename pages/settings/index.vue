<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 col-md-offset-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>
                    <ul class="error-messages">
                        <template v-for="(messages, field) in errors">
                            <li v-for="(message, index) in messages" :key="index">
                                {{ field }} {{ messages}}
                            </li>
                        </template>
                    </ul>
                    <form>
                        <fieldset class="form-group">
                            <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
                        </fieldset>
                        <fieldset class="form-group">
                            <textarea v-model="user.bio" class="form-control form-control-lg" rows="8"
                                placeholder="Short bio about you"></textarea>
                        </fieldset>
                        <fieldset class="form-group">
                            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
                        </fieldset>
                        <fieldset class="form-group">
                            <input class="form-control form-control-lg" type="password" placeholder="Password">
                        </fieldset>
                        <button v-on:click.prevent="UpdateSettings" :disabled="updateDisabled" class="btn btn-lg btn-primary pull-xs-right">
                            Update Settings
                        </button>
                    </form>
                    <hr>
                    <button class="btn btn-outline-danger" @click.prevent="logout">
                        Or click here to logout.
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
const Cookie = process.client?require('js-cookie'):''
import { mapState } from 'vuex'
import { updateUser } from '../api/user'
export default {
    middleware: 'authenticated',
    name: 'SettingsIndex',
    computed: {
        ...mapState({storeUser: 'user'})
        
    },
    mounted() {
        const { bio, email, image, password, username } = this.storeUser
        this.user = { bio, email, image, password, username }
    },
    data() {
        return {
            user: {
                bio: '',
                email: '',
                image: '',
                password: '',
                username: ''
            },
            errors: {},
            updateDisabled: false
        }
    },
    methods: {
        async UpdateSettings() {
            try {
                this.updateDisabled = true
                const { data } = await updateUser({ user: this.user })
                if (data && data.user) {
                    // 更新客户端缓存数据
                    this.$store.commit('setUser', data.user)
                    // 更新服务端数据持久化
                    Cookie.set('user', data.user)
                    console.log('完事了')
                    this.$router.push(`/profile/${data.user.username}`)
                } else {
                    this.errors = { error: '出错了' }
                }
                this.updateDisabled = false
            } catch (err) {
                this.errors = err.response.data.errors
                this.updateDisabled = false
            }
        },
        logout() {
            // 删除客户端缓存数据
            console.log('结束')
            this.$store.commit('setUser', null)
            // 删除服务端数据持久化
            Cookie.set('user', null)
            this.$router.push('/')
        }
    }
}
</script>

<style scoped lang="scss">

</style>
