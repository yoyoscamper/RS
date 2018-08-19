<template>
  <div id="myForum">
    <!-----------------------我的论坛---------------------------->
    <el-row v-if="showPage === '0'">
      <el-col class="forum" :span="8">
        <img class="logoForum" src="../../../assets/mySetting/my1.png" @click="toPage('1')"/>
        <label class="labelForum">我的帖子</label>
      </el-col>
      <el-col  class="forum" :span="8">
        <img class="logoForum" src="../../../assets/mySetting/my2.png" @click="toPage('2')"/>
        <label class="labelForum">我的消息</label>
      </el-col>
      <el-col  class="forum" :span="8">
        <img class="logoForum" src="../../../assets/mySetting/my3.png" @click="toPage('3')"/>
        <label class="labelForum" @goback="goback">我的关注</label>
      </el-col>
    </el-row>

    <!-----------------------我的帖子---------------------------->
    <my-ties v-if="showPage === '1'"></my-ties>

    <!-----------------------我的消息---------------------------->
    <my-message v-if="showPage === '2'"></my-message>

    <!-----------------------我的关注---------------------------->
    <my-focus v-if="showPage === '3'"></my-focus>
  </div>
</template>

<script>
  import myFocus from './myFocus';
  import myMessage from './myMessage';
  import myTies from './myTies';
  export default {
    name: 'myForum',
    components: {
      myTies,
      myMessage,
      myFocus
    },
    data: function () {
      return {
        showPage: '0'
      };
    },
    methods: {
      toPage (value) {
        this.showPage = value;
      },
      goback (value) {
        this.showPage = value;
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.showPage = '0';
      });
    }
  };
</script>

<style scoped>
  #myForum{
    padding: 10px 20px;
  }
.logoForum{
  cursor: pointer;
  width: 220px;
  margin-bottom: 10px;
}
  .labelForum{
    cursor: pointer;
    margin-top: 10px;
    font-weight: 700;
    color: #4e79ad;
  }
  .forum{
    text-align: center;
  }
  .logoForum:focus{
    box-shadow: 0 4px 8px 0 rgba(12, 26, 39, 0.31);
  }
</style>
