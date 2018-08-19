<template>
  <el-dialog id="goodsInfo" title="商品详情" :visible.sync="goodsVisible" width="66%" @open="open()"
             :before-close="handleClose">
    <el-row>
      <el-col :span="10">
        <div class="block">
          <el-carousel trigger="click" height="350px">
            <el-carousel-item v-for="pic in goods.pics" :key="pic">
              <img :src="pic"/>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="14" style="padding-left: 2%">
        <div class="goodsName">{{goods.title}}</div>
        <div class="goodsPrice">
          <label>价格</label>
          <label class="font-r">¥{{goods.price}}</label>
          <label class="goodsSales">销量{{goods.totalSale}}笔</label>
        </div>
        <div class="goodsNum">商品编号：{{goods.serialNumber}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-tabs v-model="activeName" @tab-click="changeTab">
        <el-tab-pane label="详情" name="detail">
          <div id="detail" v-html="goods.detail">
          </div>
        </el-tab-pane>
        <el-tab-pane label="评价" name="commend">
          <el-radio-group v-model="commendType">
            <el-radio :label="1">全部&nbsp;({{commend.all}})</el-radio>
            <el-radio :label="2">有图&nbsp;({{commend.pic}})</el-radio>
            <el-radio :label="3">满意&nbsp;({{commend.nice}})</el-radio>
            <el-radio :label="4">一般&nbsp;({{commend.common}})</el-radio>
            <el-radio :label="5">不满意&nbsp;({{commend.bad}})</el-radio>
          </el-radio-group>
          <div class="commendList" v-for="commend in commendList" :key="commend.id">
            <el-col :span="4">
              {{commend.user}}
            </el-col>
            <el-col :span="20">
              <div>{{commend.content}}</div>
              <div>{{commend.date}}</div>
            </el-col>
          </div>
        </el-tab-pane>
      </el-tabs>

    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">加入购物车</el-button>
      <el-button type="primary" @click="handleClose">立即购买</el-button>
    </span>
  </el-dialog>


</template>

<script>
  export default {
    name: 'goodsInfo',
    props: ['goodsVisible', 'goodsId'],
    data: function () {
      return {
        activeName: 'detail',
        commendList: [{
          id: '21',
          user: 'zhangsan',
          content: '很喜欢',
          date: '2018-02-12'
        }],
        commendType: 1,
        commend: {
          all: 0,
          pic: 0,
          nice: 0,
          common: 0,
          bad: 0
        },
        goods: {
          pics: [
            {
              url: require('../../../assets/mySetting/sp.jpg')
            },
            {
              url: require('../../../assets/mySetting/sp.jpg')
            }
          ],
          title: '商品一',
          price: 12,
          totalSale: 3,
          status: '已售完',
          serialNumber: '123289348',
          detailList: [{
            id: '1',
            url: require('../../../assets/mySetting/sp.jpg')
          }, {
            id: '2',
            url: require('../../../assets/mySetting/sp.jpg')
          }]
        }
      };
    },
    methods: {
      handleClose () {
        this.$emit('headCallBack', false);
      },
      changeTab (tab, event) {
        console.log(tab, event);
      },
      getGoodDetail () { // 查询详情
        let self = this;
        let params = {};
        let url = '/api/1.0/products/client/' + this.goodsId;
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.goods = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('商品详情获取失败，请联系管理员');
          });
      },
      getComments () {
        let self = this;
        let params = {};
        let url = '/api/1.0/products/' + this.goodsId + '/comment?where=&status=&order=-createdAt&skip=0&limit=15';
        self.$axios.get(url, params, {}, {emulateJSON: true})
          .then((res) => {
            console.log(res);
            this.goods = res.data;
          })
          .catch((error) => {
            self.logining = false;
            console.log(error);
            self.$message.error('商品详情获取失败，请联系管理员');
          });
      },
      open () {
        this.getGoodDetail();
        this.getComments();
      }
    }
  };
</script>

<style>
  #goodsInfo .el-carousel {
    background: #f3f3f3 !important;
    text-align: center !important;
  }

  #goodsInfo .goodsName {
    font-size: 16px;
    line-height: 21px;
    color: #3c3c3c;
    min-height: 21px;
    font-weight: 700;
    padding: 0 10px;
  }

  #goodsInfo .goodsPrice {
    padding: 10px 10px;
    background: #e0f5ff;
    margin: 10px 0;
  }

  #goodsInfo .font-r {
    font-size: 18px;
    font-weight: 700;
    color: #ff371b;
    margin-left: 20px;
  }

  #goodsInfo .goodsSales {
    float: right;
  }

  #goodsInfo .goodsNum {
    padding: 0 10px;
  }

  #goodsInfo .detail-img {
    width: 60%;
  }

  #goodsInfo #detail {
    text-align: center;
  }

  #goodsInfo .el-dialog__body {
    height: 350px;
    overflow-y: auto;
  }

  #goodsInfo .el-dialog {
    position: fixed !important;
    left: 20% !important;
    margin-top: 6vh !important;
  }

  .commendList {
    padding: 10px;
    height: 35px;
    border-bottom: 1px solid #eee;
  }
</style>
