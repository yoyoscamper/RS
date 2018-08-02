<template>
  <div id="mien" class="main">
    <el-row>
      <el-col :span="5">
        <div class="grid-content">
          <el-row class="class-icon">
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
          </el-row>
          <el-row class="class-icon">
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
          </el-row>
          <el-row class="class-icon">
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
          </el-row>
          <el-row class="class-icon">
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
            <el-col :span="8">
              <el-tag>语文</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-row>
          <el-col :span="6" v-for="quick in quickList">
            <div class="channel">
              <a href="" target="_blank">
                <img class="channel-image" :src="quick.quickImageUrl"></img>
                <p class="challen-title">{{quick.quickName}}</p>
              </a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1 class="article-category-title">实战推荐</h1>
        </div>
      </el-col>
      <el-col :span="6" v-for="quick in quickList">
        <div class="article-image">
          <img :src="quick.quickImageUrl"/>
        </div>
        <div class="article-title">
          <p>各类比赛各类比赛各类比赛各类比赛各类比赛</p>
        </div>
        <div class="article-info">
          <i class="article-viewCount">1268</i>
          <i class="article-time">一个月前</i>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1 class="article-category-title">实战推荐</h1>
        </div>
      </el-col>
      <el-col :span="6" v-for="quick in quickList">
        <div class="article-image">
          <img :src="quick.quickImageUrl"/>
        </div>
        <div class="article-title">
          <p>各类比赛各类比赛各类比赛各类比赛各类比赛</p>
        </div>
        <div class="article-info">
          <i class="article-viewCount">1268</i>
          <i class="article-time">一个月前</i>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1 class="article-category-title">实战推荐</h1>
        </div>
      </el-col>
      <el-col :span="6" v-for="quick in quickList">
        <div class="article-image">
          <img :src="quick.quickImageUrl"/>
        </div>
        <div class="article-title">
          <p>各类比赛各类比赛各类比赛各类比赛各类比赛</p>
        </div>
        <div class="article-info">
          <i class="article-viewCount">1268</i>
          <i class="article-time">一个月前</i>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1 class="article-category-title">实战推荐</h1>
        </div>
      </el-col>
      <el-col :span="6" v-for="quick in quickList">
        <div class="article-image">
          <img :src="quick.quickImageUrl"/>
        </div>
        <div class="article-title">
          <p>各类比赛各类比赛各类比赛各类比赛各类比赛</p>
        </div>
        <div class="article-info">
          <i class="article-viewCount">1268</i>
          <i class="article-time">一个月前</i>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'mien',
    data: function () {
      return {
        quickList: [],
        articleCategories: []
      };
    },
    methods: {
      banners () {
        let self = this;
        let params = {
          limit: 4
        };
        let url = '/api/1.0/quick/getQuick';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.quickList = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('banners获取失败，请联系管理员');
          });
      },
      articleCategories () {
        let self = this;
        let params = {
          limit: 10
        };
        let url = 'https://wonapi.maxleap.cn/1.0/cms/type';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.articleCategories = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('articleCategories获取失败，请联系管理员');
          });
      }
    },
    mounted: function () {
      this.banners();
    }
  };
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .channel {
    width: 90px;
    height: 90px;
    margin: 0 30px;
  }

  .main {
    width: 1200px;
    margin: auto;
  }

</style>
<style>
  .class-icon {
    height: 90px;
    padding: 45px 0;
  }
</style>
<style>
  .channel {
    text-align: center;
  }

  .channel-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    margin: 0 auto;
  }

  .challen-title {
    padding: 0;
    margin: 0;
    text-align: center;
  }
</style>
<style>
  .article-category-title {
    text-align: center;
  }

  .article-image {
    width: 300px;
    height: 120px;
    text-align: center;
    vertical-align: middle;
    display: table-cell
  }

  .article-image img {
    width: 250px;
    height: 120px;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }

  .article-title {
    width: 300px;
    text-align: center;
    max-width: 100%;
  }

  .article-title p {
    width: 250px;
    text-align: center;
    margin: 0 auto;
  }

  .article-info {
    width: 300px;
    text-align: left;
    max-width: 100%;
    padding: 0 25px;
  }

  .article-viewCount {
    width: 80px;
  }

  .article-time {
    width: 80px;
  }
</style>
<style>
  .el-row {
    margin-bottom: 20px;

  &
  :last-child {
    margin-bottom: 0;
  }

  }
  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
