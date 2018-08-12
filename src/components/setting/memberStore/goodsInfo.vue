<template>
  <div id="goodsInfo">
    <el-row>
      <el-col :span="10">
        <div class="block">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item v-for="pic in goods.picList" :key="pic.url">
              <img :src="pic.url"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="14">

      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
      name: 'goodsInfo',
      data: function () {
        return {
          goods: {
            picList: [
              {
                url: require('../../../assets/mySetting/sp.jpg')
              },
              {
                url: require('../../../assets/mySetting/sp.jpg')
              }
            ],
            name: '商品一',
            price: 12,
            sales: 3,
            status: '已售完'
          }
        };
      }
    };
</script>

<style scoped>

</style>
