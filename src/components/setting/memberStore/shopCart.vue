<template>
  <el-dialog id="shopCart" title="购物车" :visible.sync="shopCartVisible" width="66%" @open="openShop" :before-close="handleClose">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedGoods" @change="handleCheckedChange">
      <el-row class="shopCartInfo" v-for="(goods,index) in shopCartList" :key="goods.id">
        <el-col :span="1">
          <el-checkbox :label="goods.id"></el-checkbox>
        </el-col>
        <el-col :span="3">
          <img class="info-img" :src="goods.img"/>
        </el-col>
        <el-col :span="12">
          <label class="info-title">{{goods.title}}</label>
        </el-col>
        <el-col :span="2">
          <label class="info-price font-14">¥{{goods.price}}</label>
        </el-col>
        <el-col class="font-14" :span="4">
          <i class="el-icon-minus" @click="minusNum(index)"></i>
          <input class="info-num" v-model="goods.num"/>
          <i class="el-icon-plus"  @click="plusNum(index)"></i>
        </el-col>
        <el-col :span="2">
          <label class="info-del font-14">删除</label>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <span slot="footer" class="footer dialog-footer">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <el-button class="countBtn" type="primary" @click="handleClose">结算</el-button>
      <div class="allPrice">¥{{allPrice}}</div>
    </span>
  </el-dialog>
</template>

<script>
    var goodsOptions = [];
    export default {
      name: 'shopCart',
      props: ['shopCartVisible'],
      data: function () {
        return {
          shopCartList: [
            {
              id: '11',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: 12,
              num: 1
            },
            {
              id: '12',
              img: require('../../../assets/mySetting/sp.jpg'),
              title: '商品一',
              price: 12,
              num: 1
            }
          ],
          checkAll: false, // 是否全选
          checkedGoods: [], // 选中的商品
          isIndeterminate: true,
          allPrice: 0 // 选中的总价格
        };
      },
      methods: {
        openShop () {
          // console.log(JSON.parse(localStorage.shopCartList));
          // if (JSON.parse(localStorage.shopCartList) !== undefined) {
          //   this.shopCartList = localStorage.shopCartList;
          // }
          // if (localStorage.checkedGoods !== undefined) {
          //   this.checkedGoods = localStorage.checkedGoods;
          // }
          goodsOptions = [];
          for (let i = 0; i < this.shopCartList.length; i++) {
            goodsOptions.push(this.shopCartList[i].id);
          }
        },
        minusNum (index) {
          if (this.shopCartList[index].num > 1) {
            this.shopCartList[index].num = this.shopCartList[index].num - 1;
          }
          this.countFinalPrice();
        },
        plusNum (index) {
          // todo不能大于库存数
          this.shopCartList[index].num = this.shopCartList[index].num + 1;
          this.countFinalPrice();
        },
        handleClose () {
          this.$emit('headCallBack', false);
        },
        handleCheckAllChange (val) {
          this.checkedGoods = val ? goodsOptions : [];
          this.isIndeterminate = false;
          let count = 0;
          if (val) { // 全选
            for (let j = 0; j < this.shopCartList.length; j++) { // 计算总价
              count += this.shopCartList[j].price * this.shopCartList[j].num;
            }
          }
          this.allPrice = count;
          localStorage.setItem('shopCartList', this.shopCartList);
          localStorage.setItem('checkedGoods', this.checkedGoods);
        },
        handleCheckedChange (value) {
          console.log(this.checkedGoods);
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.shopCartList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.shopCartList.length;
          this.countFinalPrice();
          localStorage.setItem('shopCartList', this.shopCartList);
          localStorage.setItem('checkedGoods', this.checkedGoods);
        },
        countFinalPrice () {
          let count = 0;
          for (let i = 0; i < this.checkedGoods.length; i++) {
            for (let j = 0; j < this.shopCartList.length; j++) {
              if (this.checkedGoods[i] === this.shopCartList[j].id) {
                count += this.shopCartList[j].price * this.shopCartList[j].num;
              }
            }
          }
          this.allPrice = count;
        }
      }
    };
</script>

<style >
#shopCart .el-dialog, .el-dialog__footer{
   text-align: left;
 }
 #shopCart .el-dialog__body{
   padding: 10px 20px;
   height: 350px;
   overflow-y: auto;
  }
  #shopCart .el-dialog{
    position: fixed !important;
    left: 20% !important;
    margin-top: 6vh !important;
  }
  #shopCart .shopCartInfo .el-checkbox__label{
    display: none;
  }
  #shopCart .info-img{
    width: 80px;
    height: 80px;
    margin-left: 10px;
    margin-top: 6px;
  }
  #shopCart .info-title{
    font-size: 14px;
    margin-left: 10px;
    font-weight: 600;
  }
  .font-14{
    font-size: 14px;
  }
  #shopCart .shopCartInfo{
    display: flex;
    border-bottom: 1px solid #dbdcdc6b;
    margin-top: 10px;
  }
  #shopCart .info-num{
    width: 22px;
    padding: 0;
    margin: 0;
  }
  #shopCart .el-icon-minus,  #shopCart .el-icon-plus{
    padding: 2px 2px;
    border: 1px solid #c9c9c9;
    color: #c9c9c9;
    cursor: pointer;
  }
  #shopCart .countBtn{
    float: right;
    margin-bottom: 20px;
  }
  #shopCart .allPrice{
    float: right;
    margin-top: 10px;
    margin-right: 20px;
    color: #ff4518;
  }
</style>
