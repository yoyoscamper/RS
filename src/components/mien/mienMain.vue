<template>
  <div id="main">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-container>
        <el-main>Main</el-main>
        <el-footer>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <a href="" target="_blank" v-for="quick in quickList">
                  <img class="i-web" src=""></img>
                  <p class="tit">{{quick.quickName}}</p>
                </a>
              </div>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'mien',
    data: function () {
      return {
        quickList: []
      };
    },
    methods: {
      banners () {
        let self = this;
        let params = {
          limit: 10
        };
        let url = '/api/1.0/quick/getQuick';
        self.$axios.get(url, params, {
        }, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.quickList = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('banners获取失败，请联系管理员');
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
</style>
<style scoped>
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
