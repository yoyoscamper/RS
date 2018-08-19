<template>
  <div id="myMessage">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="消息" name="message">
        <div class="noData" v-if="messageList.length === 0">
          <label >暂无消息</label>
        </div>
      </el-tab-pane>
      <el-tab-pane label="赞" name="praise">
        <div class="noData" v-if="praiseList.length === 0">
          <label >暂无赞</label>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    export default {
      name: 'myMessage',
      data: function () {
        return {
          activeName: 'message',
          messageList: [],
          praiseList: []
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
.noData{
  text-align: center;
  margin-top: 40px;
  color: #666467;
}
</style>
