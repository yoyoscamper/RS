<template>
  <div id="articleList" class="main">
    <el-container>
      <el-header>
        <el-row>
          <el-col :span="2" v-for="item in 12" :key="item">
            <el-tag>语文</el-tag>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-col :span="6" v-for="item in 8" :key="item">
          <div class="article-image">
            <img src="img3.mukewang.com/586395f4000145e006000338-240-135.jpg"/>
          </div>
          <div class="article-title">
            <p>各类比赛各类比赛各类比赛各类比赛各类比赛</p>
          </div>
          <div class="article-info">
            <i class="article-viewCount">1268</i>
            <i class="article-time">一个月前</i>
          </div>
        </el-col>
      </el-main>
      <el-footer>
        <div class="block">
          <span class="demonstration">页数较少时的效果</span>
          <el-pagination
            layout="prev, pager, next"
            :total="50">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>


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
  .article-category {
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
