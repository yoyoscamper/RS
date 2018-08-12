<template>
    <div id="myMain">
      <div class="my-info-bg">
        <div class="my-info">
          <div class="my-logo">
            <img class="my-logo-img" src="../../../static/images/tx_black.png"/>
          </div>
          <div class="my-info-name">
            <label>YDY</label>
            <br>
            <label class="my-tel">15651800854</label>
          </div>
          <div class="my-data">
            <div class="my-data-m">
              <label class="cursor-p">0.00</label><label class="f-size-14 cursor-p">元</label>
              <br>
              <label class="f-size-14 cursor-p">我的余额</label>
            </div>
            <div class="my-data-j">
              <label class="cursor-p">2</label><label class="cursor-p f-size-14">分</label>
              <br>
              <label class="f-size-14 cursor-p">我的积分</label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <el-container>
          <el-aside width="150px">
            <div class="my-menu" v-for="menu in myMenu" :key="menu.id">
              <label :id="menu.id" class="my-menu-title" @click="chooseMyMenu(menu.id)">{{menu.title}}</label>
            </div>
          </el-aside>
          <el-main>
            <store-list v-if="myMenuCurrent === 'member-store'"></store-list>
          </el-main>
        </el-container>
      </div>
    </div>
</template>

<script>
  import storeList from './memberStore/storeList';
  export default {
    name: 'myMain',
    components: {
      storeList
    },
    data: function () {
      return {
        myMenu: [{
          id: 'member-store',
          title: '会员商城'
        }, {
          id: 'store-order',
          title: '商城订单'
        }, {
          id: 'after-sale',
          title: '商城售后'
        }, {
          id: 'my-forum',
          title: '我的论坛'
        }, {
          id: 'customer-service',
          title: '我的客服'
        }],
        myMenuCurrent: ''
      };
    },
    methods: {
      chooseMyMenu (menuId) {
        this.myMenuCurrent = menuId;
        let menuList = document.getElementsByClassName('my-menu-title');
        for (let i = 0; i < menuList.length; i++) {
          menuList[i].classList.remove('current-menu');
        }
        document.getElementById(menuId).classList.add('current-menu');
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        document.getElementsByClassName('my-menu-title')[0].classList.add('current-menu');
        this.myMenuCurrent = this.myMenu[0].id;
      });
    }
  };
</script>

<style scoped>
  .my-info-bg{
    background: url("../../assets/mySetting/bj1.png");
    width: 100%;
    height: 140px;
  }
  .my-info{
    position: relative;
    width: 72%;
    margin: 0 auto;
  }
  .my-logo-img{
    text-align: center;
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
  .my-logo{
    float: left;
    border: 4px solid #FFF;
    box-shadow: 0 4px 8px 0 rgba(7,17,27,.1);
    width: 140px;
    height: 140px;
    position: relative;
    border-radius: 50%;
    background: #fff;
    top: 24px;
  }
  .my-info-name{
    float: left;
    font-weight: 600;
    font-size: 24px;
    color: #619dd2;
    position: relative;
    top: 68px;
    line-height: 28px;
    left: 20px;
  }
  .my-tel{
    font-size: 12px;
  }
  .my-data{
    float: right;
    position: relative;
    top: 68px;
  }
  .my-data-m, .my-data-j{
    margin-right: 20px;
    float: left;
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
    color: rgba(52, 116, 132, 0.8);
    line-height: 28px;
  }
  .f-size-14{
    font-size: 14px;
  }
  .cursor-p{
    cursor: pointer;
    padding-right: 10px;
  }
  .el-container{
    width: 100%;
    padding: 20px 14%;
  }
  .my-menu{
    color: #619dd2;
    cursor: pointer;
    padding: 10px 20px;
  }
  .my-menu-title{
    cursor: pointer;
    padding: 5px 22px;
  }
  .current-menu{
    background: #6aa8d7;
    color: #fff;
    padding: 5px 22px;
  }
  .el-aside{
    border-right: 1px solid #cadeec;
  }
  #myMain .el-main{
    overflow-y: hidden;
  }
</style>
