<template>
  <div id="storeList">
    <i class="el-icon-goods" @click="showShopCart"></i>
    <label class="shopNum" v-if="shopNum > 0" @click="showShopCart">{{shopNum}}</label>
    <el-row :gutter="20">
      <el-col :span="6"  class="goodsList" v-for="goods in goodsList" :key="goods.id" @click="toGoodDetail(goods.id)">
        <img class="goodsLogo" :src="goods.img" @click="toGoodDetail(goods.id)"/>
        <div>
          <label class="goodsTitle">{{goods.title}}</label>
        </div>
        <div>
          <label class="price">¥{{goods.price}}</label>
          <label class="sales">销量{{goods.sales}}笔</label>
        </div>
      </el-col>
    </el-row>
    <shop-cart :shopCartVisible="shopCartVisible"  @headCallBack="headShopCallBack"></shop-cart>
    <goods-info :goodsVisible="goodsVisible" :goodsId="goodsId" @headCallBack="headCallBack"></goods-info>
  </div>
</template>

<script>
  import shopCart from './shopCart';
  import goodsInfo from './goodsInfo';
  export default {
    name: 'storeList',
    components: {
      goodsInfo,
      shopCart
    },
    data: function () {
      return {
        goodsVisible: false, // 商品详情显示
        shopCartVisible: false, // 购物车显示
        goodsId: '',
        shopNum: 1,
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
    },
    methods: {
      toGoodDetail (goodsId) { // 跳转至商品详情
        this.goodsVisible = true;
        this.goodsId = goodsId;
      },
      headCallBack (value) { // 隐藏商品详情
        this.goodsVisible = value;
      },
      headShopCallBack (value) { // 隐藏购物车
        this.shopCartVisible = value;
      },
      showShopCart () { // 显示购物车
        this.shopCartVisible = true;
      }
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
  .el-icon-goods{
    position: fixed;
    right: 10%;
    font-size: 38px;
    color: #ffffff;
    background: #9ab4bc;
    cursor: pointer;
  }
  .shopNum{
    position: fixed;
    cursor: pointer;
    right: 9.5%;
    font-size: 12px;
    color: #ffffff;
    background: #f33104;
    margin-top: 26px;
    padding: 0 5px;
    border-radius: 50%;
  }
</style>
