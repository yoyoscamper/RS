<template>
  <el-container>
    <el-header>
      <index-header @getCurrRole="getCurrRole"></index-header>
    </el-header>
    <el-container>
      <el-aside id="aside" style="width: auto;background-color: #4f617a;">
        <div class="nav-ul" :class="[isCollapse ? 'indexAuto' : 'indexWidth']">
          <div class="menu-list" :class="[slide ? 'menu-show' : 'menu-hide']">
            <EasyScrollbar :barOption="myBarOption">
              <div id="wrapper" class="menus">
                <el-menu :default-active="activeMenu"  class="el-menu-vertical-demo" unique-opened :collapse="isCollapse"  background-color="#50637a" text-color="#f1f2f7" active-text-color="#50637a" router>
                  <div id="changeStatus" @click="changeStatus">
                    <i style="padding-top: 13px;color:#f1f2f7" class="el-icon-more"></i>
                  </div>
                  <el-menu-item index="agency"><i class="el-icon-date"></i><span>待办</span></el-menu-item>
                  <el-submenu v-for="(menu, index) in userMenus" :index="menu.menuId" :key="menu.menuId">
                    <template slot="title"><i :class="menu.menuIconUrl"></i><span>{{menu.menuName}}</span></template>
                    <template v-if="menu.children">

                      <el-menu-item v-for="(childMenu, i) in menu.children" :index="childMenu.menuUrl" :key="childMenu.menuId">
                        <span>{{childMenu.menuName}}</span>
                      </el-menu-item>
                    </template>
                  </el-submenu>

                 <!-- <el-menu-item index="agency"><i class="el-icon-date"></i><span>待办</span></el-menu-item>
                  <el-menu-item index="projectMain"><i class="el-icon-setting"></i><span>项目管理</span></el-menu-item>
                  <el-submenu index="2">
                    <template slot="title"><i class="el-icon-date"></i><span slot="title">物料管理</span></template>
                    <el-menu-item index="material"><i class="iconfont icon-yuandianxiao"></i>物料档案</el-menu-item>
                    <el-menu-item index="materialType"><i class="iconfont icon-yuandianxiao"></i>物料类别</el-menu-item>
                  </el-submenu>
                  <el-submenu index="3">
                    <template slot="title"><i class="el-icon-time"></i><span slot="title">生产计划管理</span></template>
                    <el-menu-item index="orderManage"><i class="iconfont icon-yuandianxiao"></i>订单管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4">
                    <template slot="title"><i class="el-icon-edit-outline"></i><span slot="title">计划执行管理</span></template>
                    &lt;!&ndash;<el-menu-item index="workOrderManage"><i class="iconfont icon-yuandianxiao"></i>派工单管理</el-menu-item>&ndash;&gt;
                    <el-menu-item index="workOrderExamine"><i class="iconfont icon-yuandianxiao"></i>派工单审核</el-menu-item>
                    <el-menu-item index="piesImplement"><i class="iconfont icon-yuandianxiao"></i>派工单状态管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="5">
                    <template slot="title"><i class="el-icon-menu"></i><span slot="title">系统管理</span></template>
                    <el-menu-item index="userManage"><i class="iconfont icon-yuandianxiao"></i>用户管理</el-menu-item>
                    <el-menu-item index="role"><i class="iconfont icon-yuandianxiao"></i>角色管理</el-menu-item>
                    <el-menu-item index="menuManage"><i class="iconfont icon-yuandianxiao"></i>菜单管理</el-menu-item>
                    <el-menu-item index="dictionaryManage"><i class="iconfont icon-yuandianxiao"></i>字典管理</el-menu-item>
                    <el-menu-item index="departmentManage"><i class="iconfont icon-yuandianxiao"></i>部门管理</el-menu-item>
                    <el-menu-item index="workCategoryManage"><i class="iconfont icon-yuandianxiao"></i>工种管理</el-menu-item>
                    <el-menu-item index="workCenterManage"><i class="iconfont icon-yuandianxiao"></i>工作中心管理</el-menu-item>
                    <el-menu-item index="customerManage"><i class="iconfont icon-yuandianxiao"></i>客户管理</el-menu-item>
                    <el-menu-item index="groupManage"><i class="iconfont icon-yuandianxiao"></i>班组管理</el-menu-item>
                    <el-menu-item index="workShiftsManage"><i class="iconfont icon-yuandianxiao"></i>班次管理</el-menu-item>
                    <el-menu-item index="holidayManage"><i class="iconfont icon-yuandianxiao"></i>假期管理</el-menu-item>
                    <el-menu-item index="sysCfgManage"><i class="iconfont icon-yuandianxiao"></i>系统配置</el-menu-item>
                  </el-submenu>
                  <el-submenu index="6">
                    <template slot="title"><i class="el-icon-refresh"></i><span slot="title">齐套申请</span></template>
                    <el-menu-item index="applyMain"><i class="iconfont icon-yuandianxiao"></i>齐套申请</el-menu-item>
                  </el-submenu>
                  <el-submenu index="7">
                    <template slot="title"><i class="el-icon-news"></i><span slot="title">下料申请</span></template>
                    <el-menu-item index="uploadApplyMain"><i class="iconfont icon-yuandianxiao"></i>下料申请</el-menu-item>
                  </el-submenu>
                  <el-submenu index="8">
                    <template slot="title"><i class="el-icon-mobile-phone"></i><span slot="title">班组派工</span></template>
                    <el-menu-item index="groupDispatching"><i class="iconfont icon-yuandianxiao"></i>班组派工</el-menu-item>
                  </el-submenu>
                  <el-submenu index="9">
                    <template slot="title"><i class="el-icon-service"></i><span slot="title">派工单汇报</span></template>
                    <el-menu-item index="workOrderReport"><i class="iconfont icon-yuandianxiao"></i>派工单汇报</el-menu-item>
                  </el-submenu>
                  <el-submenu index="10">
                    <template slot="title"><i class="el-icon-phone"></i><span slot="title">工序交接</span></template>
                    <el-menu-item index="ProcessHandover"><i class="iconfont icon-yuandianxiao"></i>工序交接</el-menu-item>
                  </el-submenu>
                  <el-submenu index="11">
                    <template slot="title"><i class="el-icon-view"></i><span slot="title">物料跟踪管理</span></template>
                    <el-menu-item index="materialStorageRecord"><i class="iconfont icon-yuandianxiao"></i>出入库管理</el-menu-item>
                    <el-menu-item index="storageManage"><i class="iconfont icon-yuandianxiao"></i>仓库管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="12">
                    <template slot="title"><i class="el-icon-printer"></i><span slot="title">设备管理</span></template>
                    <el-menu-item index="equipmentManage"><i class="iconfont icon-yuandianxiao"></i>设备管理</el-menu-item>
                    <el-menu-item index="maintenancePlanManage"><i class="iconfont icon-yuandianxiao"></i>保养计划管理</el-menu-item>
                    <el-menu-item index="maintenanceManage"><i class="iconfont icon-yuandianxiao"></i>维护管理</el-menu-item>
                  </el-submenu>
                  <el-submenu index="13">
                    <template slot="title"><i class="el-icon-tickets"></i><span slot="title">生产问题管理</span></template>
                    <el-menu-item index="workProblemTypeManage"><i class="iconfont icon-yuandianxiao"></i>生产问题类别</el-menu-item>
                    <el-menu-item index="workProblemManage"><i class="iconfont icon-yuandianxiao"></i>生产问题管理</el-menu-item>
                    <el-menu-item index="DistributionProductionProblems"><i class="iconfont icon-yuandianxiao"></i>分配生产问题</el-menu-item>
                    <el-menu-item index="FeedbackProductionProblems"><i class="iconfont icon-yuandianxiao"></i>生产问题反馈</el-menu-item>
                  </el-submenu>-->

                </el-menu>
              </div>
            </EasyScrollbar>
          </div>
        </div>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import indexHeader from '../../components/index/header/header.vue';
  import ElContainer from 'element-ui/packages/container/src/main';
  export default {
    name: 'index',
    data: function () {
      return {
        userMenus: [], // 用户可见菜单
        isCollapse: false,
        myBarOption: {
          railColor: '#415c98',
          barColor: '#415c98',
          barWidth: 0,
          autohidemode: true,
          horizrailenabled: false
        },
        slide: true,
        currRoleId: ''
      };
    },
    components: {
      ElContainer,
      indexHeader: indexHeader
    },
    computed: {
      activeMenu () {
        console.log('activeMenu');
        console.log(this.$store.state.activeMenu);
        return this.$store.state.activeMenu;
      }
    },
    methods: {
      changeStatus () {
        this.isCollapse = !this.isCollapse;
      },
      toHomePage () {
        this.$router.push('/homePage');
      },
      getCurrRole (roleId) {
        this.currRoleId = roleId;
        this.getMenu();
      },
      menuSlide: function () {
        this.slide = !this.slide;
      },
      getMenu () {
        let self = this;
        let roleId = this.currRoleId;
        this.$axios.get('/api/sysRole/queryMenuExtTreeByRole?roleId=' + roleId).then((res) => {
          let success = res.data.status;
          if (success === true) {
            self.userMenus = res.data.model.sysMenulist;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message.error('请求错误，请重试！');
        });
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.$store.dispatch('refresh');
      });
    },
    watch: {
      currRoleId: function () {
        console.log('111' + this.currRoleId);
      },
      '$route' (to, from) {
        let menu = to.path.substring(1);
        if (menu === 'projDevPlan') {
          menu = 'projectMain';  // 当点击项目研发计划按钮时，还是选择项目管理菜单
        }
        this.$store.dispatch('setActiveMenu', menu);
      }
    }
  };
</script>

<style type="stylus">
  #changeStatus{
    text-align:center;
    background-color: #596e88;
    height: 40px;
  }
  .el-main {
    padding-bottom: 100px !important;
    height: 100vh;
    padding: 30px 35px;
    background-color: #f5f5f5;
    overflow-y: auto;
    overflow-x: hidden;
    position:relative;
  }
  #index{
    width: 100%;
    padding: 0px;
    margin: 0px;
  }
  .el-header{
    height: 80px !important;
  }
  .header{
    width: 100%;
    height: 80px;
    padding: 15px 0;
    margin: 0px;
    background: url("../../../static/images/banner.png") no-repeat;
    background-size:100% 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
  #aside{
    height: 100vh;
    overflow: hidden;
  }
  .menu-list{
    width: 100%;
  }
  .menus{
    width: 100%;
    height: 80vh;
  }
  .nav-ul .el-menu{
    width: 100%;
    border-right: none;
  }
  .nav-ul .el-menu li:nth-child(1) .el-submenu__icon-arrow{
    display: none;
  }
  .nav-content{
    flex: 1;
    height: 100vh;
    overflow-y: auto;
    background: #095698;
  }
  .index-tab{
    padding-top: 10px;
    padding-left: 10px;
    height: 30px;
    background: #c4cad7;
  }
  .index-tab .el-tabs__nav{
    background: #ffffff;
  }
  .index-tab .el-tabs__header{
    margin: 0px;
  }
  .index-tab .el-tabs__item{
    height: 30px;
    line-height: 30px;
  }
  .icon-jc{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
   /* background: url('../../../static/images/jc.png') no-repeat;*/
    background-size: 100% 100%;
  }
  .icon-work {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .icon-hcst{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .icon-yjcl{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .icon-xcyh{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .icon-jcxx{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  .icon-tjfx{
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    background-size: 100% 100%;
  }
  #homePageLoge{
    cursor :pointer;
  }
  .is-active{
    background-color : #f1f2f7 !important;
    color :#50637a !important;
  }
  .indexWidth{
    width: 187px;
  }
  .indexAuto{
    width: auto;
  }
</style>
