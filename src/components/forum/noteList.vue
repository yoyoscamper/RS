<template>
  <div id="noteList">
    <div id="noteTitle">
      <img class="noteTitlePic" :src="noteInfo.imgUrl"/>
    </div>
    <div id = "noteInfo">
      <img class="noteLogo" :src="noteInfo.logoUrl" />
      <lable id="noteName" class="noteContent">{{noteInfo.title}}</lable>
      <label class="noteContent noteFocus">关注：{{noteInfo.guanzhuNum}}</label>
      <label class="noteContent noteNum">帖子：{{noteInfo.tieziNum}}</label>
      <el-button class="focusBtn" size="small" type="primary" v-if="!isFocus">关注</el-button>
      <el-button class="focusBtn" size="small" type="primary" v-else>已关注</el-button>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane :label="pane.name" v-for="pane in paneList" :key="pane.name">
        <div v-for="note in noteList" :key="note.id" class="noteListContent">
            <i class="el-icon-message"></i>
            <label class="contentNum">{{note.contentNum}}</label>
            <label class="noteInfoTitle">{{note.title}}</label>
            <label class="noteDate">{{note.date}}</label>
            <label class="noteUserName">{{note.userName}}</label>
            <img class="noteUserLogo" :src="note.logoUrl"/>
            <label class="noteInfoContent">{{note.content}}</label>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
      name: 'noteList',
      data: function () {
        return {
          isFocus: false,
          noteInfo: {
            imgUrl: require('../../assets/forumPic/timg.jpg'),
            logoUrl: require('../../assets/forumPic/yuwen.jpg'),
            title: '语文',
            guanzhuNum: 10,
            tieziNum: 2
          },
          paneList: [
            {
              name: '全部'
            },
            {
              name: '热门'
            }
          ],
          noteList: [
            {
              id: '12',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '这是一条记录',
              logoUrl: require('../../assets/forumPic/username.png')
            },
            {
              id: '11',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '这是一条记录',
              logoUrl: require('../../assets/forumPic/username.png')
            }
          ]
        };
      }
    };
</script>

<style scoped>
  #noteList {
    padding: 0 11%;
  }
  .noteTitlePic{
    width: 100%;
    height: 220px;
  }
  .noteLogo{
    border: 1px solid #ececec;
    background: #fff;
    padding: 5px;
    width: 100px;
    left: 14px;
    position: relative;
    bottom: 58px;
  }
  #noteInfo{
    height: 68px;
    border-top: 1px solid #f1f1f1;
    background: #fff;
    margin-top: -4px;
  }
  .noteContent{
    position: absolute;
  }
  #noteName{
    margin-top: 11px;
    margin-left: 20px;
    font-size: 20px;
  }
  .noteFocus{
    margin-left: 136px;
    font-size: 12px;
    color: #0885d0;
    margin-top: 20px;
  }
  .noteNum{
    margin-left: 260px;
    font-size: 12px;
    color: #0885d0;
    margin-top: 20px;
  }
  .focusBtn{
    float: right;
    margin-top: 20px;
    margin-right: 20px;
  }
  .noteUserLogo{
    width: 19px;
    float: right;
    margin-top: 4px;
  }
  .noteInfoContent{
    font-size: 12px;
    color: #333;
  }
  .noteUserName, .noteDate{
    float: right;
    font-size: 12px;
    margin-top: 5px;
    color: #8a8a8a;
  }
  .noteDate{
    margin-left: 10px;
  }
  .noteUserName{
    margin-left: 5px;
  }
  .contentNum, .el-icon-message{
    font-size: 12px;
    color: #bbbbbb;
  }
  .noteListContent{
    height: 40px;
    margin-top: 10px;
    border-bottom: 1px solid #f5f5f5;
  }
</style>
