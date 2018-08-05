<template>
  <div id="noteContent">
    <div id = "noteInfo">
      <img class="noteLogo" :src="noteInfo.logoUrl" />
      <lable id="noteName" class="noteContent">{{noteInfo.title}}</lable>
      <label class="noteNum">关注：{{noteInfo.guanzhuNum}}</label>
      <label class="noteNum">帖子：{{noteInfo.tieziNum}}</label>
    </div>
    <div id="contentInfo">
      <el-row class="userInfo">
        <el-col :span="2">
          <img :src="userLogo"/>
        </el-col>
        <el-col :span="22">
          <label>清远</label>
          <br>
          <label>2018-02-13 12:12</label>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <label>标题</label>
        </el-col>
        <el-col :span="24">
          <label>内容</label>
        </el-col>
        <el-col :span="24">
          <img class="noteTitlePic" :src="noteInfo.imgUrl"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'noteContent',
      data: function () {
        return {
          noteId: '',
          userLogo: require('../../../static/images/tx_black.png'),
          onlyOne: false, // 只看楼主
          noteInfo: {
            imgUrl: require('../../assets/forumPic/timg.jpg'),
            logoUrl: require('../../assets/forumPic/yuwen.jpg'),
            title: '语文',
            guanzhuNum: 10,
            tieziNum: 2
          }
        };
      },
      methods: {
        searchNote () { // 查找帖子
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          this.$store.state.activeMenu = 'forumMain';
          var searchStr = location.search;
          console.log(searchStr);
          this.noteId = searchStr.split('=')[1];
          this.searchNote();
        });
      }
    };
</script>

<style scoped>
  #noteContent{
    padding: 0 11%;
  }
  .noteLogo{
    border: 1px solid #ececec;
    background: #fff;
    padding: 5px;
    width: 55px;
    margin-top: 29px;
    margin-left: 20px;
  }
  #noteInfo{
    border: 1px solid #eee;
    width: 100%;
    height: 122px;
    background: #fff;
  }
  #noteName{
    position: relative;
    top: -28px;
    left: 10px;
    cursor: pointer;
  }
  .noteNum{
    position: relative;
    top: -27px;
    left: 35px;
    font-size: 12px;
    color: #b5b5b5;
  }
  .userInfo{
    background: #fff;
  }
</style>
