<template>
    <div>
        <van-nav-bar
            title="用户登录"
            left-text="返回"
            left-arrow
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                icon="clear"
                placeholder="请输入用户名"
                required
                @click-icon="username = ''"
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
        </div>
        <div class="register-button">
            <van-button
                type="primary"
                @click="loginAction"
                size="large"
                :loading="openLoading">登录</van-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import { Toast } from 'vant'
    export default {
        data() {
            return {
                username: "",
                password: "",
                openLoading: false,
                usernameErrorMsg: "",
                passwordErrorMsg: "",
            }
        },
        methods: {
            goBack() {
              this.$router.go(-1);  
            },
            loginAction() {
                this.checkForm() && this.axiosLoginUser()
            },
            axiosLoginUser() {
                this.openLoading = true;
                axios({
                    url: url.login,
                    method: 'post',
                    data: {
                        userName: this.username,
                        password: this.password
                    }
                }).then((res) => {
                    if (res.data.code == 200) {
                        console.log(res);
                        Toast.success('登录成功');
                        this.$router.push('/');
                    } else {
                        console.log(res.data.message);
                        Toast.fail('登录失败')
                        this.openLoading = false;
                    }
                }).catch((err) => {
                    Toast.fail('登录失败');
                    this.openLoading = false;
                })
            },
            checkForm() {
                let isOk = true;
                if (this.username.length < 5) {
                    this.usernameErrorMsg = "用户名不能少于5位"
                    isOk = false;
                } else {
                    this.usernameErrorMsg = ""
                }
                if (this.password.length < 5) {
                    this.passwordErrorMsg = "密码不能少于5位"
                    isOk = false;
                } else {
                    this.passwordErrorMsg = ""
                }
                return isOk
            }
        },
    }
</script>

<style scoped>
    .register-panel {
        width: 96%;
        border-radius: 5px;
        margin: 20px auto;
    }
    .register-button {
        padding-top: 10px;
    }
</style>