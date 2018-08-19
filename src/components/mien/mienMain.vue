<template>
  <div id="mien" class="main">
    <el-row>
      <el-col :span="5">
        <div class="grid-content">
          <el-row>
            <el-col :span="8" v-for="category in articleCategories" :key="item">
              <el-tag class="class-icon">{{category.name}}</el-tag>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="19">
        <div class="grid-content bg-purple">
          <el-carousel indicator-position="outside" class="banner-carousel">
            <el-carousel-item v-for="banner in banners" :key="item" class="banner-carousel">
              <img class="banner-image" :src="banner.bannerImageUrl"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <el-row>
          <el-col :span="6" v-for="banner in banners" :key="item">
            <div class="channel">
              <a href="" target="_blank">
                <img class="channel-image" :src="banner.bannerImageUrl"/>
                <p class="challen-title">{{banner.bannerName}}</p>
              </a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row v-for="category in articleCategories" :key="item">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <h1 class="article-category-title">{{category.name}}</h1>
        </div>
      </el-col>
      <el-col :span="6" v-for="channel in channels" :key="item">
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
        banners: [],
        channels: [],
        articleCategories: []
      };
    },
    methods: {
      getBanners () {
        let self = this;
        let params = {
          limit: 4
        };
        let url = '/api/1.0/cms/banner/getBanner';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.banners = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('banners获取失败，请联系管理员');
          });
      },
      getChannels () {
        let self = this;
        let params = {};
        let url = '/api/1.0/banner/getBanner';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log('banner');
            console.log(res);
            this.channels = res.data.results;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('banners获取失败，请联系管理员');
          });
      },
      getArticleCategories () {
        let self = this;
        let params = {};
        let url = '/api/1.0/cms/type';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.articleCategories = res.data.results;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('articleCategories获取失败，请联系管理员');
          });
      },
      chooseCategory (categoryId) { // 选择分类
        window.open(window.location.origin + '/articleDetail');
        // this.$router.push({name: 'noteList', params: {forumId: forumId}});
      },
      chooseArticle (articleId) { // 选择文章
        window.open(window.location.origin + '/articleList');
        // this.$router.push({name: 'noteList', params: {forumId: forumId}});
      }
    },
    mounted: function () {
      this.getBanners();
      this.getChannels();
      this.getArticleCategories();
    }
  };
</script>
<style scoped>
  .main {
    width: 1386px;
    margin: 0 auto;
  }
</style>
<style scoped>
  .banner-carousel {
    height: 500px;
  }

  .banner-image {
    min-height: 550px;
  }
  .channel {
    width: 90px;
    height: 90px;
    margin: 0 30px;
  }

</style>
<style>
  .class-icon {
    margin: 15px 0;
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
