<template>
  <div id="app" :cs='test'>
    <Transition name="transition_app" mode="out-in">
      <!-- <KeepAlive> -->
      <router-view />
      <!-- </KeepAlive> -->
    </Transition>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import api from "./axios";
//生命周期仅执行一次
export default {
  async created() {
    this.checkHasLogin(JSON.parse(localStorage.getItem("userInfo")));
  },
  computed: {
    ...mapState(["userInfo", "goodsData",'test']),
  },
  async mounted() {
    console.log('我是app.vue')
    let data = await api.getGoods();
    this.getGoods(data.reverse());
  },
  methods: {
    ...mapMutations(["getGoods", "checkHasLogin",'setTest']),
  },
  watch: {
    userInfo: {
      immediate: false,
      deep: true,
      handler(n, o) {
        localStorage.setItem("userInfo", JSON.stringify(n));
      },
    },
  },
};
</script>

<style lang='less' scoped>
.transition_app-enter-active,
.transition_app-leave-active {
  transition: all 0.4s;
}
.transition_app-enter,
.transition_app-leave-to {
  opacity: 0.4;
}
</style>
