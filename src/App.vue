<template>
  <div>
    <transition name="move" mode="out-in">
        <router-view></router-view>
    </transition>

  </div>
</template>

<script>
/**
 * 引入jquery，在webpack.base.conf.js的resolve中配置jquery别名，执行npm install --save jquery
 */
// import $ from 'jquery';

export default {
  name: 'app',
  data: function () {
    return {
    };
  },
  components: {
  },
  methods: {
  },
  mounted: function () {
    this.$nextTick(function () {
     // console.log($);
    });
  }
};
</script>

<style type="stylus">

</style>
