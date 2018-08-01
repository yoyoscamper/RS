<template>
  <div>
    <div class="login">
      <div class="login_box">
        <div class="login_form_box">
          <div style="flex: 1;text-align: center;">
            <img src="../../../static/images/materialDefault.png" width="188px">
            <span style="color:#fff;font-size:32px;display: block;margin-top: 19px">锐师</span>
          </div>
          <div class="login-form" style="flex: 1">
            <div class="form-div">
              <el-form status-icon :model="loginForm" ref="loginForm"  :rules="rules">
                <div class="login_form_ele">
                  <el-form-item prop="userName">
                    <el-input type="text" prefix-icon="el-icon-name" v-model="loginForm.userName" id="userName"></el-input>
                  </el-form-item>
                </div>
                <div  class="login_form_ele">
                  <el-form-item prop="password">
                    <el-input type="password" prefix-icon="el-icon-password" v-model="loginForm.password" id="password" @keyup.enter.native="login"></el-input>
                  </el-form-item>
                </div>
              </el-form>
              <div style=" position: relative;padding: 0 10px" @click="login">
                <el-button type="primary" :loading="logining">登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
                <div  class="login_button_adorn"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  // import axios from 'axios';
  export default {
    computed: mapGetters({
      token: 'getToken'
    }),
    name: 'login',
    data: function () {
      return {
        logining: false,
        loginForm: {
          userName: '',
          password: ''
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath);
      },
      ...mapActions({
        setToken: 'setToken'
      }),
      login () {
        let self = this;
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {
            self.logining = true;
            let params = {
              phone: self.loginForm.userName,
              password: self.loginForm.password
            };
            let url = '/api/1.0/mems/passwordLogin';
            self.$axios.post(url, params, {
              headers: {
                'x-ml-appid': '56b17529169e7d000197d2d7',
                'content-type': 'application/json'
              }
            }, {emulateJSON: true})
              .then((res) => {
                let success = res.data.status;
                if (success === true) {
                  self.$store.dispatch('setToken', 'Bearer ' + res.data.model.token);
                  self.$store.dispatch('setCurrUser', JSON.stringify(res.data.model.currUser));
                  // axios.defaults.headers.common['Authorization'] = self.$store.getters.getToken;
                  self.logining = false;
                  // setInterval(self.refresh, 70000);
                  // self.$router.push('/homePage');
                } else {
                  self.logining = false;
                  self.$message.error(res.data.message);
                }
              })
              .catch((error) => {
                self.logining = false;
                console.log(error);
                self.$message.error('登陆失败，请联系后台管理员');
              });
            self.$router.push('/index');
          }
        });
      }
      // refresh () {
      //   let options = {
      //     headers: {
      //       Authorization: this.$store.getters.getToken
      //     }
      //   };
      //   this.$http.get('/api/tokenRefresh', options).then((res) => {
      //     let success = res.body.success;
      //     if (success === true) {
      //       this.$store.dispatch('setToken', 'Bearer ' + res.body.data.token);
      //     }
      //   }, (res) => {
      //     this.$message.error('请求错误，请重试！');
      //   });
      // }
    },
    mounted: function () {
      this.$nextTick(function () {
        sessionStorage.clear();
        document.getElementById('userName').focus();
      });
    }
  };
</script>

<style type="stylus">
  .login{
    width:100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background: url("../../../static/images/login_back.jpg") no-repeat;
    background-size: 100% 100%;
  }
  .login-form{
    background: url("../../../static/images/dlk.png") no-repeat;
    background-size: 100% 100%;
  }
  .form-div{
    padding: 110px 30px;
  }
  .login_box{
    width:50%;
    margin:0 auto;
    padding-top: 10%;
  }
  .login_form_box{
    display: flex;
    align-items: center;
  }
  .login_form_box form{
    color: #fff;
  }
  .login_form_ele{
    width: 100%;
    margin-bottom: 20px;
    padding: 0 10px;
    box-sizing:border-box;
  }
  .login_form_ele input{
    display: inline-block;
    width: 100%;
    border: 1px #7491d3 solid;
    outline: none;
    line-height: 40px;
    height: 40px;
    margin-bottom: 1px;
    border-radius: 4px;
    background: #263c76;
    color: #ffffff;
  }
  .login .el-input__inner{
    padding-left: 40px !important;
  }
  .login_form_ele .el-input__prefix .el-input__icon{
    width: 28px;
    height: 50%;
    margin-top: 10px;
    margin-left: 5px;
    border-right: 1px #7491d3 solid;
  }
  .el-icon-name{
    background: url('../../../static/images/username.png') no-repeat;
  }
  .el-icon-password{
    background: url('../../../static/images/password.png') no-repeat;
  }
  .form-div .el-button--primary{
    width:100%;
    height: 40px;
    border: none;
    background: #3aaffe;
    color: #ffffff;
    border-radius: 5px;
    font-size: 18px;
  }
</style>
