<template>
  <div id="orderList">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="pane in paneList" :key="pane" :label="pane.label" :name="pane.name">
        <label class="font-c-g" v-if="orderList.length === 0">暂无订单</label>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    export default {
      name: 'orderList',
      data () {
        return {
          activeName: '0',
          paneList: [{
            label: '全部',
            name: '0'
          }, {
            label: '待付款',
            name: '1'
          }, {
            label: '待成团',
            name: '2'
          }, {
            label: '待发货',
            name: '3'
          }, {
            label: '待收货',
            name: '4'
          }, {
            label: '交易失败',
            name: '5'
          }],
          orderList: []
        };
      },
      methods: {
        handleClick (tab, event) {
          console.log(tab, event);
        }
      }
    };
</script>

<style scoped>
#orderList{
  padding: 0 20px;
}
  .font-c-g{
    color: #666467;
  }
</style>
