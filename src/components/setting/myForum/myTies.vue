<template>
  <div id="myTies">
    <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item @click="goback">我的论坛</el-breadcrumb-item>
        <el-breadcrumb-item>我的帖子</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的主贴" name="first">
        <div v-for="note in noteList" :key="note.id" class="noteListContent" @click="chooseNote(note)">
          <i class="el-icon-message"></i>
          <label class="contentNum">{{note.contentNum}}</label>
          <label class="noteInfoTitle">{{note.title}}</label>
          <label class="noteDate">{{note.date}}</label>
          <label class="noteUserName">{{note.userName}}</label>
          <img class="noteUserLogo" :src="note.logoUrl"/>
          <br>
          <label class="noteInfoContent">{{note.content}}</label>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的回帖" name="second">
        <div v-for="note in replyList" :key="note.id" class="noteListContent" @click="chooseNote(note)">
          <i class="el-icon-message"></i>
          <label class="contentNum">{{note.contentNum}}</label>
          <label class="noteInfoTitle">原贴：{{note.title}}</label>
          <label class="noteDate">{{note.date}}</label>
          <label class="noteUserName">{{note.userName}}</label>
          <img class="noteUserLogo" :src="note.logoUrl"/>
          <br>
          <label class="noteInfoContent">回复：{{note.content}}</label>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的投票" name="third">
        <div v-for="note in voteList" :key="note.id" class="noteListContent" @click="chooseNote(note)">
          <img class="voteLogo" src="../../../assets/mySetting/vote.png"/>
          <label class="contentNum">{{note.contentNum}}</label>
          <label class="noteInfoTitle">【投票】{{note.title}}</label>
          <label class="noteDate">{{note.date}}</label>
          <label class="noteUserName">{{note.userName}}</label>
          <img class="noteUserLogo" :src="note.logoUrl"/>
          <br>
          <label class="noteInfoContent">共{{note.voteNum}}个投票选项</label>
          <label class="voteState">(我已投票)</label>
        </div>
      </el-tab-pane>
    </el-tabs>


  </div>
</template>

<script>
    export default {
      name: 'myTies',
      data: function () {
        return {
          activeName: 'first',
          noteList: [
            {
              id: '12',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录这是一条记录',
              logoUrl: require('../../../assets/forumPic/username.png')
            },
            {
              id: '11',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '这是一条记录',
              logoUrl: require('../../../assets/forumPic/username.png')
            }
          ],
          replyList: [
            {
              id: '12',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '好的',
              logoUrl: require('../../../assets/forumPic/username.png')
            },
            {
              id: '11',
              userName: '一清',
              title: '问题处理',
              date: '2018-02-09',
              contentNum: 3,
              content: '这是一条回复',
              logoUrl: require('../../../assets/forumPic/username.png')
            }
          ],
          voteList: [{
            id: '12',
            voteNum: 3, // 投票选项数量
            userName: '一清',
            voteState: true, // 是否已投票
            voteCount: 1, // 已投票数量
            title: '问题处理',
            date: '2018-02-09',
            contentNum: 3,
            content: '好的',
            logoUrl: require('../../../assets/forumPic/username.png'),
            logoUrlList: [
              {
                logoUrl: require('../../../assets/forumPic/username.png')
              }
            ]
          }]
        };
      },
      methods: {
        queryNoteList () { // 查询帖子
          this.paneLoading = true;
          for (let i = 0; i < this.noteList.length; i++) {
            if (this.noteList[i].content.length > 20) {
              this.noteList[i].content = this.noteList[i].content.substring(0, 20) + '...';
            }
          }
          this.paneLoading = false;
        },
        goback () {
          console.log(1221);
          this.$emit('goback', '0');
        },
        handleClick (tab, event) {
          console.log(tab, event);
        },
        chooseNote (note) {
          window.open(window.location.origin + '/noteContent?noteId=' + note.id);
        }
      },
      mounted: function () {
        this.$nextTick(function () {
          this.queryNoteList();
        });
      }
    };
</script>

<style >
  #myTies .noteListContent{
    height: 48px;
    margin-top: 10px;
    border-bottom: 1px solid #ececec;
  }
  #myTies .noteInfoTitle{
    cursor: pointer;
  }
  #myTies .noteInfoTitle:hover{
    text-decoration: underline;
    color: #050ac5;
  }
  #myTies .noteUserLogo{
    width: 19px;
    float: right;
    margin-top: 4px;
  }
  #myTies .noteInfoContent{
    font-size: 12px;
    color: #333;
    cursor: pointer;
    margin-left: 29px
  }
  #myTies .noteUserName, .noteDate{
    float: right;
    font-size: 12px;
    margin-top: 5px;
    color: #8a8a8a;
  }
  #myTies .noteDate{
    margin-left: 10px;
  }
  #myTies .noteUserName{
    margin-left: 5px;
  }
  #myTies .contentNum, .el-icon-message{
    font-size: 12px;
    color: #bbbbbb;
  }
  #myTies .voteLogo{
    width: 12px;
  }
  #myTies .voteState{
    font-size: 12px;
    color: red;
  }
</style>
