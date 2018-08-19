<template>
  <div id="articleDetail" class="main">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark" v-for="item in 4" :key="item">
          <img class="banner-image" src="../../assets/forumPic/yuwen.jpg"/>
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
        articleCategories: []
      };
    },
    methods: {
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
