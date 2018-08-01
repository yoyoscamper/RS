<template>
    <div id="forumMain">
      <el-row>
        <el-col :span="14">
          <div class="block">
            <el-carousel trigger="click" height="300px">
              <el-carousel-item v-for="picUrl in picList" :key="id">
                <img class="picList" :src="picUrl.imgUrl"/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="10" id="forumList">
          <div v-for="forum in forumList" class="forumInfo">
            <div>
              <img class="forumLogo" :src="forum.imgUrl"/>
              <label v-html="forum.name"></label>
              <!--<el-button type="primary"  size="mini" plain >进入</el-button>-->
            </div>
            <div class="forumNum">
              <label>关注：{{forum.guanzhuNum}}</label>
              <label>帖子：{{forum.tieziNum}}</label>
            </div>
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
      }
    };
</script>

<style scoped>
  #forumMain {
    padding: 0 11%;
  }
  #forumMain #forumList{
    height: 300px;
    overflow-y: auto;
    background-color: #fff;
  }
  #forumList .forumLogo{
    width: 44px;
    float: left;
    margin-right: 10px;
  }
  .forumInfo{
    padding: 5px 10px;
    cursor: pointer;
    height: 44px;
    border-bottom: solid #f1f1f1;
  }
  #forumList .el-button{
    float: right;
  }
  .forumNum{
    float: right;
    margin-top: 10px;
    font-size: 14px;
    color: #716f6f;
  }
  .picList{
    height: 300px;
  }
</style>
