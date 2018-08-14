<template>
  <el-dialog id="shopCart" title="购物车" :visible.sync="shopCartVisible" width="66%" :before-close="handleClose">
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
    <el-checkbox-group v-model="checkedGoods" @change="handleCheckedChange">
      <el-row class="shopCartInfo" v-for="(goods,index) in shopCartList" :key="goods.id">
        <el-col :span="1">
          <el-checkbox :label="goods.title"></el-checkbox>
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
    </span>
  </el-dialog>
</template>

<script>
    var cityOptions = ['11'];
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
          checkAll: false,
          checkedGoods: [],
          isIndeterminate: true
        };
      },
      methods: {
        minusNum (index) {
          if (this.shopCartList[index].num > 1) {
            this.shopCartList[index].num = this.shopCartList[index].num - 1;
          }
        },
        plusNum (index) {
          // todo不能大于库存数
          this.shopCartList[index].num = this.shopCartList[index].num + 1;
        },
        handleClose () {
          this.$emit('headCallBack', false);
        },
        handleCheckAllChange (val) {
          this.checkedGoods = val ? cityOptions : [];
          this.isIndeterminate = false;
        },
        handleCheckedChange (value) {
          let checkedCount = value.length;
          this.checkAll = checkedCount === this.shopCartList.length;
          this.isIndeterminate = checkedCount > 0 && checkedCount < this.shopCartList.length;
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
  }
</style>
