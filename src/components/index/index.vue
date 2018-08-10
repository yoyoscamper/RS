<template>
  <el-container>
    <el-header>
      <index-header @setCurrMenu="setCurrMenu"></index-header>
    </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
</template>

<script>
  import indexHeader from '../../components/index/header/header.vue';
  import ElContainer from 'element-ui/packages/container/src/main';
  export default {
    name: 'index',
    data: function () {
      return {
      };
    },
    components: {
      ElContainer,
      indexHeader: indexHeader
    },
    computed: {
    },
    methods: {
      setCurrMenu (currMenu) {
        sessionStorage.setItem('currMenu', currMenu);
      }
    },
    mounted: function () {
      this.$nextTick(function () {
      });
    },
    watch: {
    }
  };
</script>

<style type="stylus">
  .el-main {
    padding-bottom: 100px !important;
    height: 100vh;
    padding: 0!important;
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

</style>
