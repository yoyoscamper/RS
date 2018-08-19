<template>
    <el-dialog id="goodsInfo" title="商品详情" :visible.sync="goodsVisible" width="66%" :before-close="handleClose">
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
        <el-col :span="14" style="padding-left: 2%">
          <div class="goodsName">{{goods.name}}</div>
          <div class="goodsPrice">
            <label>价格</label>
            <label class="font-r">¥{{goods.price}}</label>
            <label class="goodsSales">销量{{goods.sales}}笔</label>
          </div>
          <div class="goodsNum">商品编号：{{goods.num}}</div>
        </el-col>
      </el-row>
      <el-row>
        <el-tabs v-model="activeName" @tab-click="changeTab">
          <el-tab-pane label="详情" name="detail">
            <div id="detail">
              <img class="detail-img" v-for="detail in goods.detailList" :key="detail.id" :src="detail.url"/>
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
            status: '已售完',
            num: '123289348',
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
        getGoodInfo () {
          let self = this;
          let params = {};
          let goodsId = this.$route.params.goodsId;
          let url = '/1.0/products/client/' + goodsId;
          self.$axios.get(url, params, {}, {emulateJSON: true})
            .then((res) => {
              console.log(res);
              this.goods = res.data.results;
            })
            .catch((error) => {
              self.logining = false;
              console.log(error);
              self.$message.error('articleCategories获取失败，请联系管理员');
            });
        }
      },
      mounted: function () {
        this.getGoodInfo();
      }
    };
</script>

<style >
  #goodsInfo .el-carousel{
    background: #f3f3f3 !important;
    text-align: center !important;
  }
  #goodsInfo .goodsName{
    font-size: 16px;
    line-height: 21px;
    color: #3c3c3c;
    min-height: 21px;
    font-weight: 700;
    padding: 0 10px;
  }
  #goodsInfo .goodsPrice{
    padding: 10px 10px;
    background: #e0f5ff;
    margin: 10px 0;
  }
  #goodsInfo .font-r{
    font-size: 18px;
    font-weight: 700;
    color: #ff371b;
    margin-left: 20px;
  }
  #goodsInfo .goodsSales{
    float: right;
  }
  #goodsInfo .goodsNum{
    padding: 0 10px;
  }
  #goodsInfo .detail-img{
    width: 60%;
  }
  #goodsInfo #detail{
    text-align: center;
  }
  #goodsInfo .el-dialog__body{
    height: 350px;
    overflow-y: auto;
  }
  #goodsInfo .el-dialog{
    position: fixed !important;
    left: 20% !important;
    margin-top: 6vh !important;
  }
  .commendList{
    padding: 10px;
    height: 35px;
    border-bottom: 1px solid #eee;
  }
</style>
