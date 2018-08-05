<template>
  <div id="noteContent">
    <div id = "noteInfo">
      <img class="noteLogo" :src="noteInfo.logoUrl" />
      <label id="noteName" class="noteContent">{{noteInfo.title}}</label>
      <label class="noteNum">关注：{{noteInfo.guanzhuNum}}</label>
      <label class="noteNum">帖子：{{noteInfo.tieziNum}}</label>
      <label class="noteNum">已有{{listCount}}条回复</label>
    </div>
    <div>
      <i id="toWriteBtn" class="el-icon-edit" @click="openReply"></i>
    </div>
    <div id="contentInfo">
      <el-row >
        <el-col :span="4" class="userInfo">
          <img :src="userLogo" class="userLogo"/>
          <br>
          <label>清远</label>
        </el-col>
        <el-col :span="20" class="min-h">
          <el-row>
            <el-col :span="24" class="noteTitle">
              <label>标题</label>
              <div class="titleBtn">
                <label v-if="onlyOne" @click="tpOnlyOne">楼主</label>
                <label class="onlyOne" v-else @click="tpOnlyOne">楼主</label>
                <label @click="openReply">回复</label>
              </div>
            </el-col>
            <el-col :span="24" class="content">
              <label>内容</label>
            </el-col>
            <el-col :span="24" v-for="pic in picList" :key="pic.imgUrl">
              <img class="noteTitlePic" :src="pic.imgUrl"/>
            </el-col>
          </el-row>
          <label class="noteTime">2018-02-13 12:12</label>
          <label class="replyBtn" @click="openReply">回复</label>
        </el-col>
      </el-row>
    </div>
    <div id="noteReply">
      <el-row v-for="reply in replyList" :key="reply.id">
        <el-col :span="4" class="userInfo">
          <img :src="userLogo" class="userLogo"/>
          <br>
          <label>清远</label>
        </el-col>
        <el-col :span="20" class="min-h">
          <el-row>
            <el-col :span="24" class="content">
              <label>回复内容</label>
            </el-col>
          </el-row>
          <label class="noteTime">2018-02-13 12:12</label>
          <label class="replyBtn" @click="openReply">回复</label>
        </el-col>
      </el-row>
    </div>
    <el-dialog  title="回复" :visible.sync="reply.replyDialogVisible"   width="40%" :before-close="handleClose">
      <el-input type="textarea"  v-model="reply.content"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="toReply">回 复</el-button>
      </span>
    </el-dialog>
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
          },
          picList: [{
            imgUrl: require('../../assets/forumPic/timg.jpg')
          }],
          replyList: [{
            id: '11'
          }], // 回复列表
          listCount: 0, // 回复条数
          pageSize: 10,
          pageNum: 0,
          reply: {
            replyDialogVisible: false,
            content: '' // 回复内容
          } // 回复框
        };
      },
      methods: {
        toReply () {
          this.handleClose();
        },
        openReply () {
          this.reply = {
            replyDialogVisible: true,
            content: ''
          };
        },
        handleClose () {
          this.reply = {
            replyDialogVisible: false,
            content: ''
          };
        },
        tpOnlyOne () { // 主看楼主
          this.onlyOne = !this.onlyOne;
        },
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
    margin-left: 20px;
  }
  .userInfo{
    text-align: center;
  }
  .userLogo{
    border: 1px solid #dddce6;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 50%;
  }
  #contentInfo{
    min-height: 120px;
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
  }
  #noteReply{
    min-height: 120px;
    background: #f7f7f7;
    border: 1px solid #e6e6e6;
  }
  .noteTitle{
    border-bottom: 1px solid #f7f7f7;
    padding-bottom: 10px;
  }
  .content{
    font-size: 12px;
  }
  .noteTime{
    font-size: 12px;
    position: absolute;
    right: 48px;
    bottom: 5px;
    color: #9c9c9c;
  }
  .replyBtn{
    cursor: pointer;
    font-size: 12px;
    color: #007DDB;
    position: absolute;
    right: 10px;
    bottom: 5px;
  }
  .titleBtn{
    float: right;
  }
  .titleBtn label{
    font-size: 12px;
    cursor: pointer;
    padding: 2px 8px;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
  }
  .onlyOne{
    background: #186fd8;
    color: #fff;
    border-color: rgb(73, 99, 245);
  }
  #toWriteBtn{
    color: #ffffff;
    background: #4ca1dc;
    font-size: 36px;
    position: fixed;
    right: 120px;
    top: 194px;
    cursor: pointer;
  }
  .min-h{
    background: #fff;
    padding: 10px;
    min-height: 120px;
  }
</style>
