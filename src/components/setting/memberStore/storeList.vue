<template>
  <div id="storeList">
    <el-row :gutter="20">
      <el-col :span="6"  class="goodsList" v-for="goods in goodsList" :key="goods.id">
        <img class="goodsLogo" :src="goods.img"/>
        <div>
          <label class="goodsTitle">{{goods.title}}</label>
        </div>
        <div>
          <label class="price">¥{{goods.price}}</label>
          <label class="sales">销量{{goods.sales}}笔</label>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: 'storeList',
      data: function () {
        return {
          goodsList: [
            {
              id: '1',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '2',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '3',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '4',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '5',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '6',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            },
            {
              id: '7',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: '46.00',
              sales: 3
            }
          ]
        };
  }
    };
</script>

<style scoped>
.goodsLogo{
  width: 100%;
}
  #storeList{
    padding: 5px 20px;
  }
  .goodsList{
    margin-bottom: 20px;
    cursor: pointer;
    font-size: 12px;
  }
  .price{
    color: red;
    cursor: pointer;
  }
  .sales{
    float: right;
    cursor: pointer;
    color: #333333;
  }
  .goodsTitle{
    cursor: pointer;
  }
</style>
