<template>
  <div id="afterSaleMain">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="售后申请" name="apply">
        <el-form id="applySearch" :inline="true" :model="applySearch" class="demo-form-inline">
          <el-form-item >
            <el-input v-model="applySearch.applySearch" placeholder="商品名称、商品编号、订单号" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="small">查询</el-button>
          </el-form-item>
        </el-form>
        <div style="text-align: center;margin-top: 40px" v-if="applyList.length === 0">
          <label class="font-c-g" >没有可申请售后的商品</label>
        </div>

      </el-tab-pane>
      <el-tab-pane label="进度查询" name="schedule">
        <div style="text-align: center;margin-top: 40px" v-if="scheduleList.length === 0">
          <label class="font-c-g" >暂无服务单号</label>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
      name: 'afterSaleMain',
      data () {
        return {
          activeName: 'apply',
          applySearch: {
            applySearch: ''
          },
          applyList: [], // 申请列表
          scheduleList: [] // 进度列表
        };
      },
      methods: {
        handleClick (tab, event) {
          console.log(tab, event);
        },
        onSubmit () {}
      }
    };
</script>

<style scoped>
#afterSaleMain{
  padding: 0 20px;
}
#applySearch .el-form-item__content{
  width: 250px;
}
.el-tabs__content{
    text-align: center;
  }
.font-c-g{
  color: #666467;
}
  #applySearch{
    text-align: center;
  }
</style>
