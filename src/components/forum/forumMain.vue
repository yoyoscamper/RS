<template>
    <div id="forumMain">
      <el-row>
        <el-col :span="24">
          <div class="block">
            <el-carousel trigger="click" height="300px">
              <el-carousel-item v-for="picUrl in picList" :key="id">
                <img class="picList" :src="picUrl.imgUrl"/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
      </el-row>
      <el-row  id="forumList">
          <el-col :span="12" v-for="forum in forumList" :key="forum.id" class="forumInfo" @click="chooseForum(forum.id)">
            <div  @click="chooseForum(forum.id)">
              <img class="forumLogo" :src="forum.imgUrl"/>
              <label class="forumName" v-html="forum.name"></label>
              <!--<el-button type="primary"  size="mini" plain >进入</el-button>-->
            </div>
            <div class="forumNum"  @click="chooseForum(forum.id)">
              <label>关注：{{forum.guanzhuNum}}</label>
              <label>帖子：{{forum.tieziNum}}</label>
            </div>
          </el-col>
      </el-row>


    </div>
</template>

<script>
    export default {
      name: 'forumMain',
      data: function () {
        return {
          picList: [
            {
              id: 1,
              imgUrl: require('../../assets/forumPic/timg.jpg')
            },
            {
              id: 2,
              imgUrl: require('../../assets/forumPic/timg1.jpg')
            }
          ],
          forumList: [
            {
              id: '111',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            },
            {
              id: '222',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            },
            {
              id: '333',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            },
            {
              id: '444',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            },
            {
              id: '555',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            },
            {
              id: '666',
              imgUrl: require('../../assets/forumPic/yuwen.jpg'),
              name: '语文',
              guanzhuNum: 10,
              tieziNum: 2
            }
          ]// 论坛版块
        };
      },
      methods: {
        chooseForum (forumId) { // 选择板块
          window.open(window.location.origin + '/noteList');
          // this.$router.push({name: 'noteList', params: {forumId: forumId}});
        }
      }
    };
</script>

<style scoped>
  #forumMain {
    padding: 0 11%;
  }
  #forumMain #forumList{
    background-color: #fff;
  }
  #forumList .forumLogo{
    width: 80px;
    float: left;
    margin-right: 10px;
  }
  .forumInfo{
    padding: 10px 10px;
    cursor: pointer;
    height: 100px;
    border-bottom: solid #f1f1f1;
    border-right: solid #f1f1f1;
  }
  #forumList .el-button{
    float: right;
  }
  .forumNum{
   /* float: right;*/
    margin-top: 28px;
    font-size: 14px;
    color: #716f6f;
  }
  .picList{
    width: 100%;
    height: 300px;
  }
  .el-carousel{
    margin-bottom: 20px;
  }
  .forumName{
    font-size: 24px;
  }
  .block{
    box-shadow: 4px 4px 12px #888888
  }
</style>
