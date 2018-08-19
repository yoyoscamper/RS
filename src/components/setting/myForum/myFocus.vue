<template>
  <div id="myFocus">
    <el-row>
      <el-col class="focusList" :span="8" v-for="focus in focusList" :key="focus.id">
        <img class="logo-img" :src="focus.img"/>
        <label class="title-css">{{focus.title}}</label>
        <label class="gray-css">关注：{{focus.focusNum}}</label>
        <label class="gray-css">帖子：{{focus.tieNum}}</label>
        <label class="btn-css">进入</label>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'myFocus',
      data: function () {
        return {
          focusList: [
            {
              id: '1',
              title: '政治',
              focusNum: 6,
              tieNum: 3,
              img: require('../../../assets/forumPic/yuwen.jpg')
            },
            {
              id: '2',
              title: '政治',
              focusNum: 6,
              tieNum: 3,
              img: require('../../../assets/forumPic/yuwen.jpg')
            },
            {
              id: '3',
              title: '政治',
              focusNum: 6,
              tieNum: 3,
              img: require('../../../assets/forumPic/yuwen.jpg')
            }
          ],
          notFocusList: []
        };
      }
    };
</script>

<style scoped>
.logo-img{
  width: 50px;
}
  .title-css{
    position: absolute;
    top: 10px;
  }
  .focusList{
    border: 1px solid #e4e4e4;
    padding: 10px 5px;
    border-radius: 5px;
  }
  .gray-css{
    font-size: 12px;
  }
  .btn-css{
    float: right;
    background: #007DDB;
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    margin-top: 32px;
    cursor: pointer;
  }
</style>
