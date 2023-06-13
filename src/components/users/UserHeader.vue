<template>
  <header>
    <Transition name="alter" mode="out-in" appear="">
      <Alter v-if="showAlterState" />
    </Transition>
    <div id="header_center">
      <div class="d1">
        <span @click="goIndex">首页</span>
        <span @click="quitLogin">退出</span>
        <span>当前位置:{{ whereStr }}</span>
      </div>
      <div class="d2">
        <span>用户:{{ userInfo.name }}</span>
        <span>余额:{{ userInfo.price }}RMB</span>
        <span>用户UID:{{ userInfo.id }}</span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Alter from "../index/Alter.vue";
export default {
  computed: {
    ...mapState(["where", "userInfo", "showAlterState"]),
    whereStr() {
      switch (this.where) {
        case "UserOrder":
          return "我的订单";
        case "UserLove":
          return "我的收藏";
        case "UserInfo":
          return "我的信息";
        case "UserGoods":
          return "我的商品";
        case "UserSend":
          return "发布商品";
        default:
          return "错误!";
      }
    },
  },
  components: { Alter },
  methods: {
    goIndex() {
      this.$router.push({ name: "home" });
    },
    quitLogin() {
      this.$router.push({ name: "home" });
      this.$store.commit("quitLogin");
    },
  },
};
</script>
<style lang='less' scoped>
header {
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 2px rgba(186, 179, 179, 0.2);
  margin-bottom: 40px;
  #header_center {
    width: 95%;
    height: 100%;
    max-width: 1400px;
    margin: 0 auto;
    > div {
      display: flex;
      align-items: center;
      height: 100%;
      span {
        height: 100%;
        line-height: 50px;
        cursor: pointer;
        transition: all 1s;
        color: rgb(0, 0, 0);
        &:hover {
          color: rgb(255, 116, 0);
        }
      }
    }
    .d1 {
      float: left;
      span {
        margin-right: 30px;
      }
    }
    .d2 {
      float: right;
      span {
        margin-left: 30px;
      }
    }
  }
}
</style>