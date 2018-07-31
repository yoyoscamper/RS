<template>
  <div class="header">
    <div class="head-user">
      <div class="logo"  v-on:click="toHomePage">
        <img src="../../../../static/images/logo.jpg" id="homePageLoge" style="width: 148px;">
      </div>
      <div class="head-left" style="margin-left: 185px">
        <label class="mes-title">研发制造管理系统</label>
      </div>
      <div class="user-setting">
        <div class="loginout" @click="loginOut">
          <img src="../../../../static/images/tc.png" @click="loginOut"/>
        </div>
        <div class="setting" @click="showPassForm">
          <img src="../../../../static/images/sz.png" @click="showPassForm"/>
        </div>
        <div class="user-info" v-cloak>
          <!--<div class="user-portrait">-->
            <!--&lt;!&ndash;<img src="../../../../static/images/ty.png" />&ndash;&gt;-->
            <!--<img src="../../../../static/images/tx_black.png" />-->
          <!--</div>-->
          <div>
              <el-dropdown @command="changeRole" style="margin-left: 15px">
                <span class="el-dropdown-link">
                  {{currRole.roleName}}
                </span>
                <el-dropdown-menu slot="dropdown" style="max-height: 300px;overflow-y: scroll">
                  <el-dropdown-item :command="role" v-for="role in roleList" :key="role.roleId">{{role.roleName}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            <div>{{currUser.userName}}</div>
          </div>

        </div>
       <!-- <div class="daiban" @click="operatingFloor">
          <img title="工作台" width="30px" height="30px" src="../../../../static/images/daiban.png"/>
          <span class="daiban-num">{{workNum}}</span>
        </div>-->
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="passFormVisible" @close="closePassDialog" :close-on-click-modal="false">
      <el-form :model="passForm" :rules="passRules">
        <el-form-item label="用户名:" :label-width="passWidth">
          <el-input :disabled="true" v-model="currUser.userAcc"></el-input>
        </el-form-item>
        <el-form-item label="原密码:" :label-width="passWidth" prop="oldPass">
          <el-input type="password" v-model="passForm.oldPass" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" :label-width="passWidth" prop="newPass">
          <el-input type="password" v-model="passForm.newPass" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" :label-width="passWidth" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closePassDialog">取 消</el-button>
        <el-button type="primary" @click="changePass">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="个人信息" :visible.sync="persionVisible" :close-on-click-modal="false">
      <el-row>
        <el-col :span="12" class="personStyle">
          姓名：系统管理员
        </el-col>
        <el-col :span="12" class="personStyle">
          账号：admin
        </el-col>
        <el-col :span="12" class="personStyle">
          手机号码：13666666661
        </el-col>
        <el-col :span="12" class="personStyle">
          邮箱：admin@qq.com
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'indexHeader',
    data: function () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        workNum: 12, // 待办个数
        passWidth: '120px',
        persionVisible: false,
        passFormVisible: false,
        passForm: {
          oldPass: '',
          newPass: '',
          checkPass: ''
        },
        user: {},
        currUser: {},
        passRules: {
          oldPass: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPass: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass, trigger: 'blur' }
          ]
        },
        curDate: '',
        curWeek: '',
        weatherImg: '',
        curTemp: '',
        roleList: [],
        currRole: {}
      };
    },
    methods: {
      queryRole () { // 查询当前用户的所有角色
        let self = this;
        let url = '/api/sysUser/queryRoleListByCurrUserId';
        this.$axios.get(url)
          .then((res) => {
            let success = res.data.status;
            if (success === true) {
              this.roleList = res.data.model;
              if (this.roleList.length > 0) {
                // this.currRole = this.roleList[0];
                this.$nextTick(function () {
                  this.queryCurrRole();
                });
              }
            } else {
              self.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('登陆失败，请联系后台管理员');
          });
      },
      changeRole (role) {
        this.$confirm('确认切换角色为' + role.roleName + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          this.currRole = role;
          this.setCurrRole();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消切换'
          });
        });
      },
      toHomePage () {
        this.$router.push('/homePage');
      },
      loginOut () {
        this.$confirm('确认是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$store.dispatch('setActiveMenu', '/login');
          this.$router.push({
            path: '/login'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消登出系统'
          });
        });
      },
      refresh () {
        this.$http.get('/api/tokenRefresh').then((res) => {
          console.log(res.body);
        }, (res) => {
          this.$message.error('请求错误，请重试！');
        });
      },
      showPassForm () {
        this.passFormVisible = true;
      },
      changePass () {
        this.$refs['passForm'].validate((valid) => {
          if (valid) {
            this.passFormVisible = false;
            this.$message({
              message: '修改密码成功',
              type: 'success'
            });
          } else {
            return false;
          }
        });
      },
      closePassDialog () {
        this.passFormVisible = false;
        this.$refs['passForm'].resetFields();
      },
      queryCurrRole () { // 查询当前角色
        let self = this;
        let url = '/api/sysUser/getCurrRoleId';
        this.$axios.get(url)
          .then((res) => {
            let success = res.data.status;
            if (success === true) {
              if (res.data.model === '' || res.data.model === undefined || res.data.model === 'undefined') {
                this.currRole = this.roleList[0];
                this.setCurrRole();
              } else {
                for (let i = 0; i < this.roleList.length; i++) {
                  if (this.roleList[i].roleId === res.data.model) {
                    this.currRole = this.roleList[i];
                  }
                }
                if (this.currRole.roleId === undefined || this.currRole.roleId === '') {
                  this.currRole = this.roleList[0];
                  this.setCurrRole();
                }
              }
            } else {
              self.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('登陆失败，请联系后台管理员');
          });
      },
      setCurrRole () { // 设置当前角色
        let self = this;
        let url = '/api/sysUser/setCurrRoleId?roleId=' + this.currRole.roleId;
        this.$axios.get(url)
          .then((res) => {
            let success = res.data.status;
            if (success === true) {
              this.$message({
                type: 'success',
                message: '设置当前角色成功!'
              });
              this.$store.dispatch('setActiveMenu', 'agency');
              console.log(this.$route.path);
              if (this.$route.path === '/agency') {
                window.location.reload();
              }
              this.$router.push({
                name: 'agency'
              });
              // this.$emit('getCurrRole', this.currRole.roleId);
            } else {
              self.$message.error(res.data.message);
            }
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('登陆失败，请联系后台管理员');
          });
      }
    },
    watch: {
      currRole: function () {
        this.$emit('getCurrRole', this.currRole.roleId); // 给父组件传值，隐藏弹出框
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.queryRole();
        this.currUser = JSON.parse(sessionStorage.currUser);
        // function isEmptyObject (obj) {
        //   for (var key in obj) {
        //     return false;// 返回false，不为空对象
        //   }
        //   return true;// 返回true，为空对象
        // }
        // if (isEmptyObject(this.currUser)) {
        //
        // }
      });
    }
  };
</script>

<style>
  [v-cloak]{
      display: none;
  }
  .header{
    display: flex;
    height: 80px;
    padding-right: 20px;
    padding-left: 20px;
    background: -webkit-linear-gradient(left, #39587e , #5f7998, #7a91ac); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #39587e, #5f7998, #7a91ac); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #39587e, #5f7998, #7a91ac); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #39587e , #5f7998, #7a91ac); /* 标准的语法（必须放在最后） */
  }
  .el-header{
    padding: 0px !important;
  }
  .head-logo{
    flex: 1;
  }
  .head-user{
    display: flex;
    width: 100%;
  }
  .user-setting, .head-left{
    flex: 1;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    color: #ffffff;
  }
  .user-setting div {
    float: right;
  }
  .user-setting, .head-left{
    width: 400px;
    height: 50px;
    box-sizing: border-box;
    position: relative;
  }
  .daiban{
    position: relative;
    margin-right: 20px;
    cursor: pointer;
    padding: 5px;
    height: 40px;
  }
  .header .el-dialog{
    width: 40%;
  }
  .header .el-dialog .el-form{
    width: 80%;
    margin: 0 auto;
  }
  .daiban-num{
    position: absolute;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    color: #ff0000;
    text-align: center;
    top: -10px;
    right: -10px;
  }
  .user-info{
    font-size: 16px;
    color: #fff;
    float: right;
    /*margin-right: 22px;*/
  }
  .user-info>div:first-child{
    float: right;
    position: relative;
   /* cursor: pointer;*/
  }
  .user-info>div:first-child>img:last-child{
    /*position: absolute;*/
    top: 3px;
    left: 4px;
  }
  .user-info>div:last-child{
    float: right;
    line-height: 3.5;
    margin-right: 26px;
  }
  .loginout{
    cursor: pointer;
    float: right;
    line-height: 4;
  }
  .daiban{
    cursor: pointer;
    float: right;
    line-height: 4;
  }
  .daiban-num{
    position: absolute;
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: #ffffff;
    color: #ff0000;
    text-align: center;
    top: 5px;
    font-size: 14px;
    right: -7px;
  }
  .setting {
    float: right;
    cursor: pointer;
    margin-right: 22px;
    line-height: 4;
  }
  .personStyle {
    padding:0 10px 10px 10px;
  }
  .mes-title{
    font-size: 26px;
    color: #fff;
    font-family: microsoftyahei bold;
  }
  .logo{
    cursor: pointer;
    height: 80px;
    color: #fff;
    background: #ffff;
    margin-right: 10px;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 188px;
  }
  .header .el-dropdown{
    font-size: 16px !important;
    color: #fff !important;
    cursor: pointer;
  }
</style>
