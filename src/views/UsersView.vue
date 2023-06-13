<template>
  <div id="UserView">
    <UserHeader />
    <div id="user-d1">
      <div class="dd1">
        <ul>
          <li class="img"><img src="@/assets/images/profile.jpg" alt="" /></li>
          <li @click="setWhere('UserOrder')">
            <i class="yumao icon-dingdan"></i><i>我的订单</i>
          </li>
          <li @click="setWhere('UserLove')">
            <i class="yumao icon-juanzeng"></i><i>我的收藏</i>
          </li>
          <li @click="setWhere('UserGoods')">
            <i class="yumao icon-xiangce"></i><i>我的商品</i>
          </li>
          <li @click="setWhere('UserSend')">
            <i class="yumao icon-fasong"></i><i>发布商品</i>
          </li>
          <li @click="setWhere('UserInfo')">
            <i class="yumao icon-shezhi1"></i><i>账户信息</i>
          </li>
        </ul>
      </div>
      <div class="dd2">
        <Transition name="transition-1" mode="out-in">
          <!-- <KeepAlive> -->
          <!-- 使用后不会触发生命周期 activated deactivated区外 -->
          <component :is="where"></component>
          <!-- 不会复用组件 -->
          <!-- </KeepAlive> -->
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from "../components/users/UserHeader.vue";
import UserOrder from "../components/users/UserOrder.vue";
import UserLove from "../components/users/UserLove.vue";
import UserInfo from "../components/users/UserInfo.vue";
import UserGoods from "../components/users/UserGoods.vue";
import UserSend from "../components/users/UserSend.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      goods: [
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["艺术品", "绘画"],
          power: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/goods1.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险", "保险"],
          price: 99.9,
          image: require("../assets/images/banner1.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner2.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner3.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner4.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner5.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner6.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner7.jpg"),
        },
        {
          id: 100,
          des: "这是描述这是描述这是描述这是描述这是描述这是描述这是描述这是描述",
          tag: ["免运费", "保险"],
          price: 99.9,
          image: require("../assets/images/banner8.jpg"),
        },
      ],
    };
  },
  computed: {
    ...mapState(["where",'test']),
  },
  methods: {
    ...mapMutations(["setWhere"]),
  },
  components: {
    UserHeader,
    UserOrder,
    UserLove,
    UserInfo,
    UserGoods,
    UserSend,
  },
};
</script>

<style lang="less" scoped>
#user-d1 {
  width: 85%;
  margin: 0 auto;
  max-width: 1280px;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  .dd1 {
    width: 20%;
    height: 82vh;
    border-radius: 3px;
    margin-right: 30px;
    background: white;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-top: 25px;
      // border: 1px solid gray;
    }
    .img {
      margin-bottom: 30px;
      text-align: center;
      img {
        width: 65px;
        height: 65px;
        border-radius: 50%;
      }
    }
    li {
      margin-bottom: 18px;
      cursor: pointer;
      width: 75%;
      // border: 1px solid red;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 1s;
      i {
        margin-right: 20px;
        transition: all 1s;
      }
    }
    li:nth-of-type(n + 2) {
      height: 30px;
      border: 1px solid rgba(128, 128, 128, 0.1);
      &:hover {
        border: 1px solid rgba(128, 128, 128, 0.9);
      }
      .yumao {
        font-size: 18px;
      }
    }
    li:nth-of-type(n + 2):hover i {
      color: black;
    }
  }
  .dd2 {
    width: 70%;
    height: 82vh;
    background: white;
    border-radius: 3px;
  }
}
.transition-1-enter-active,
.transition-1-leave-active {
  transition: all 0.5s;
}
.transition-1-enter,
.transition-1-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>    