<template>
  <el-dialog id="shopCart" title="购物车" :visible.sync="shopCartVisible" width="66%" :before-close="handleClose">
    <el-row>


    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleClose">结算</el-button>
    </span>
  </el-dialog>
</template>

<script>
    export default {
      name: 'shopCart',
      props: ['shopCartVisible'],
      data: function () {
        return {
        };
      },
      methods: {
        handleClose () {
          this.$emit('headCallBack', false);
        }
      }
    };
</script>

<style scoped>

</style>
