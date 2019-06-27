<template>
  <div>
    <router-view/>

    <van-tabbar v-model="active">
      <van-tabbar-item to="/home/substitute" icon="shop">参与</van-tabbar-item>
      <van-tabbar-item to="/home/publish" icon="edit">发布</van-tabbar-item>
      <van-tabbar-item to="/home/course" icon="records">问卷</van-tabbar-item>
      <van-tabbar-item to="/home/mine" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data() {
    return {
      msg: "Hello world -- home",
      active: 3,
    };
  }
};
</script>

<style lang="scss" scoped>
</style>

