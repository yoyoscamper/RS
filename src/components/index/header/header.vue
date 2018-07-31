<template>
  <div id="header" class="header">
    <div class="head-user">
      <!--<div class="head-left">-->
        <!--<img src="../../../../static/images/materialDefault.png" id="homePageLoge" style="width: 60px;">-->
      <!--</div>-->
      <div class="head-left">
        <label class="mes-title">锐师</label>
      </div>
      <div class="menu-list">
        <label class="menu-info" onclick="chooseMenu('mien')">风采</label>
        <label class="menu-info" onclick="chooseMenu('videoView')">课程观看</label>
        <label class="menu-info" onclick="chooseMenu('thematicCourse')">专题课程</label>
        <label class="menu-info" onclick="chooseMenu('forum')">论坛</label>
      </div>
      <div class="search-box">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchContent">
        </el-input>
      </div>
      <div class="user-setting">
        <div class="loginout" @click="loginOut">
          <img src="../../../../static/images/tc.png" @click="loginOut"/>
        </div>
        <div class="setting" @click="showPassForm">
          <img src="../../../../static/images/sz.png" @click="showPassForm"/>
        </div>
        <div class="user-info" v-cloak>
          <div class="user-portrait">
            <!--<img src="../../../../static/images/ty.png" />-->
            <img src="../../../../static/images/tx_black.png" />
          </div>
        </div>
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
        searchContent: '',  // 搜索内容
        currMenu: '' // 当前菜单
      };
    },
    methods: {
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
      chooseMenu (currMenu) { // 切换菜单
        this.currMenu = currMenu;
      }
    },
    watch: {
      currMenu: function () {
        this.$emit('setCurrMenu', this.currMenu); // 给父组件传值，隐藏弹出框
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // this.queryRole();
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
  #header .menu-list, #header .search-box{
    flex: 3;
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
  .header .el-dialog{
    width: 40%;
  }
  .header .el-dialog .el-form{
    width: 80%;
    margin: 0 auto;
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
  #header .menu-info{
    padding-right: 20px;
    cursor: pointer;
  }
  #header .menu-info:hover{
    padding-right: 20px;
    cursor: pointer;
    color: #d8efff;
  }
</style>
