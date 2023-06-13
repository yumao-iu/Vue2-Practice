<template>
  <div id="ProduceView">
    <Transition name="alter" mode="out-in" appear="">
      <Alter v-if="showAlterState" />
    </Transition>
    <header>
      <div id="header_center">
        <div class="d1">
          <span @click="goIndex">首页</span>
          <span v-show="hasLogin" @click="goWhere('UserInfo')"
            >我的余额:{{ userInfo.price }}RMB</span
          >
        </div>
        <div class="d2">
          <span>商品ID:{{ id.padStart(3, "0") }}</span>
        </div>
      </div>
    </header>
    <div id="d1">
      <p>商品介绍</p>
      <div>
        <div class="dd1">
          <img :src="getImgUrl(nowGoods)" />
        </div>
        <div class="dd2">
          <p class="des">{{ nowGoods.des }}</p>
          <p class="tag">
            <i
              class="sortColor"
              v-for="v1 in nowGoods.sort.split(',')"
              :key="v1"
              >{{ v1 }}</i
            >
            <i
              class="tagColor"
              v-for="v1 in nowGoods.tag.split(',')"
              :key="v1"
              >{{ v1 }}</i
            >
          </p>
          <p class="price">
            <i>¥</i>
            <i>{{ nowGoods.price }} RMB</i>
          </p>
          <p class="buy">
            <i @click="buyGood">购买</i>
            <i @click="loveGood">{{ hasLove }}</i>
            <i @click="addLoveNum(nowGoods.id)">点赞 ({{ loveNum }})</i>
          </p>
        </div>
      </div>
    </div>
    <div id="d2">
      <p>相似商品</p>
      <div>
        <div
          id="100"
          v-for="(v1, i1) in someGoods"
          :key="i1"
          @click="goodsDetail(v1.id)"
        >
          <div class="left">
            <img :src="getImgUrl(v1)" />
          </div>
          <div class="right">
            <p class="dec">
              {{ v1.des }}
            </p>
            <p class="tag">
              <i class="sortColor" v-for="v2 in v1.sort.split(',')" :key="v2">{{
                v2
              }}</i>
              <i class="tagColor" v-for="v2 in v1.tag.split(',')" :key="v2">{{
                v2
              }}</i>
            </p>
            <p class="price">
              <i>¥</i>
              <i>{{ v1.price }}</i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import Alter from "@/components/index/Alter.vue";
import api from "@/axios";
import axios from "axios";
export default {
  async mounted() {
    let data = await api.getGoods();
    this.getGoods(data.reverse());
    this.loveNum = JSON.parse(this.nowGoods.extra).love;
    console.log("我是goodsView.vue");
    if (!this.userInfo.love) this.userInfo.love = "";
    let loveList = this.userInfo.love.split(",");
    loveList.indexOf(this.id) != -1
      ? (this.hasLove = "已收藏")
      : (this.hasLove = "收藏");
  },
  data() {
    return {
      hasLove: "收藏",
      loveNum: "加载中",
    };
  },
  props: ["id"],
  components: { Alter },
  computed: {
    ...mapState(["goodsData", "showAlterState", "hasLogin", "userInfo",'test']),
    nowGoods() {
      return this.goodsData.filter((v) => v.id == this.id)[0];
    },
    someGoods() {
      let sort = this.nowGoods.sort;
      return this.goodsData.filter((v) => {
        return v.sort == sort;
      });
    },
  },
  methods: {
    ...mapMutations([
      "setWhere",
      "changeShowAlter",
      "setUserPrice",
      "getGoods",
    ]),
    goWhere(v) {
      if (!this.hasLogin) {
        this.changeShowAlter({ message: "请先登录😅" });
        return;
      }
      this.$router.push({ path: "/users/" + this.userInfo.id });
      this.setWhere(v);
    },
    goIndex() {
      this.$router.push({ name: "home" });
    },
    getImgUrl(v) {
      return require(`@/assets/images/${JSON.parse(v.image)[0].name}`);
    },
    goodsDetail(i) {
      this.loveNum = JSON.parse(
        this.goodsData.filter((v) => v.id == i)[0].extra
      ).love;
      i = i + "";
      //跳转到相同路由不会多次触发生命周期 除非 ...:key
      this.$router
        .push({
          path: "/goods/" + i,
        })
        .catch(() => {});
      let loveList = this.userInfo.love.split(",");
      loveList.indexOf(i) != -1
        ? (this.hasLove = "已收藏")
        : (this.hasLove = "收藏");
    },
    addLoveNum(id) {
      //接口有问题 通过控制台发送请求无限点赞
      let loveGoods = localStorage.getItem("loveGoods");
      if (loveGoods != null)
        if (loveGoods.split(",").indexOf(id + "") != -1) {
          this.changeShowAlter({ message: "你已经点赞过商品了🤯" });
          return;
        }
      this.loveNum++;
      axios({
        url: "/addLoveNum",
        data: { id },
      });
      this.changeShowAlter({ message: "点赞成功!🥰" });
      if (loveGoods == null) localStorage.setItem("loveGoods", id);
      else {
        let temp = loveGoods.split(",").concat(id).join(",");
        localStorage.setItem("loveGoods", temp);
      }
    },
    async buyGood() {
      let id = this.id;
      let price = this.nowGoods.price;
      let myPrice = this.userInfo.price;
      let goodsPrice = price;
      if (this.hasLogin) {
        if (goodsPrice > myPrice)
          this.changeShowAlter({ message: "余额不足🥵" });
        else {
          let { state, price } = await api.buyGoods(id);
          this.userInfo.price = price;
          if (state == 200) {
            this.changeShowAlter({ message: "购买成功😎" });
            this.userInfo.finishOrderNum++;
          } else this.changeShowAlter({ message: "余额不足😎" });
        }
      } else this.changeShowAlter({ message: "请先登录😋" });
    },
    async loveGood() {
      if (!this.hasLogin) {
        this.changeShowAlter({ message: "请先登录😋" });
        return;
      }
      if (!this.userInfo.love) this.userInfo.love = "";
      let gid = this.id;
      if (this.hasLove == "已收藏") return;
      let { state } = await api.loveGoods(gid);
      if (state == 200) {
        this.userInfo.love = this.userInfo.love
          .split(",")
          .concat(gid)
          .join(",");
        this.hasLove = "已收藏";
        this.userInfo.loveOrderNum++;
        this.changeShowAlter({ message: "收藏成功😎" });
      }
    },
  },
};
</script>

<style lang="less" scoped>
header {
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 2px rgba(186, 179, 179, 0.2);
  margin-bottom: 50px;
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
        margin-right: 20px;
      }
    }
    .d2 {
      float: right;
    }
  }
}
#d1 {
  width: 85%;
  margin: 0 auto;
  max-width: 1280px;
  background: white;
  border: 1px solid transparent;
  > p {
    margin-top: 30px;
    margin-left: 40px;
    font-size: 20px;
  }
  > div {
    width: 70%;
    margin: 40px auto;
    display: flex;
    justify-content: space-between;
    // border: 1px solid red;
    .dd1 {
      width: 300px;
      aspect-ratio: 1;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    }
    .dd2 {
      width: 60%;
      position: relative;
      //   border: 1px solid red;
      .des {
        font-size: 25px;
        margin-bottom: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
      }
      .tag {
        i {
          display: inline-block;
          padding: 1px 5px;
          margin-right: 15px;
          font-size: 16px;
          margin-bottom: 3px;
          // color: rgb(248, 141, 68);
          // border: 1px solid rgb(248, 141, 68);
          cursor: pointer;
        }
      }
      .price {
        position: absolute;
        bottom: 60px;
        i:nth-of-type(1) {
          font-size: 20px;
          color: rgb(24, 22, 22);
        }
        i:nth-of-type(2) {
          font-size: 35px;
        }
      }
      .num {
        position: absolute;
        bottom: 60px;
        border: 1px solid gray;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
        width: 120px;
        input {
          //   border: 1px solid gray;
          height: 100%;
          width: 16%;
          font-size: 20px;
          padding: 0 10px;
        }
        i {
          cursor: pointer;
          font-size: 50px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          width: 25px;
          background: gray;
          color: white;
        }
      }
      .buy {
        position: absolute;
        bottom: 8px;
        display: flex;
        i {
          padding: 5px 25px;
          background: gray;
          margin-right: 60px;
          color: white;
          cursor: pointer;
          background: linear-gradient(
            45deg,
            rgb(228, 171, 133),
            rgb(239, 98, 4)
          );
          box-shadow: 5px 5px 0px 2px rgb(208, 152, 114);
          transition: all 0.8s;
        }
        i:hover {
          box-shadow: 0px 0px 0px 0px rgb(208, 152, 114);
        }
      }
      .tagColor {
        color: rgb(248, 141, 68);
        border: 1px solid rgb(248, 141, 68);
      }
      .sortColor {
        color: rgb(175, 89, 90);
        border: 1px solid rgb(175, 89, 90);
      }
    }
  }
}
#d2 {
  width: 85%;
  margin: 0 auto 50px auto;
  max-width: 1280px;
  background: white;
  border: 1px solid transparent;
  > p {
    margin-top: 30px;
    margin-bottom: 35px;
    margin-left: 40px;
    font-size: 20px;
  }
  > div {
    width: 93.2%;
    // border: 1px solid gray;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > div {
      display: flex;
      justify-content: space-between;
      width: 30%;
      height: 120px;
      border: 1px solid transparent;
      margin-bottom: 45px;
      background: rgb(248, 248, 248);
      cursor: pointer;
      transition: all 1s;
      border-radius: 3px;
      &:hover {
        border: 1px solid rgba(248, 136, 69, 0.5);
        transform: translateY(-3px);
      }
      .left {
        height: 100%;
        aspect-ratio: 1.2;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
          vertical-align: middle;
        }
      }
      .right {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 53%;
        font-size: 15px;
        margin-right: 5px;
        .dec {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 2;
          margin-top: 6px;
          margin-bottom: 5px;
        }
        .tag {
          i {
            display: inline-block;
            padding: 1px 2px;
            margin-right: 5px;
            font-size: 14px;
            margin-bottom: 3px;
          }
        }
        .tagColor {
          color: rgb(248, 141, 68);
          border: 1px solid rgb(248, 141, 68);
        }
        .sortColor {
          color: rgb(175, 89, 90);
          border: 1px solid rgb(175, 89, 90);
        }
        .price {
          position: absolute;
          bottom: 3px;
          i:nth-of-type(1) {
            font-size: 13px;
          }
          i:nth-of-type(2) {
            font-size: 18px;
          }
        }
      }
    }
  }
}
.transition_1-enter-active,
.transition_1-leave-active {
  transition: all 0.6s;
}
.transition_1-enter,
.transition_1-leave-to {
  opacity: 0;
}
.alter-enter-active,
.alter-leave-active {
  transition: all 0.6s;
}
.alter-enter,
.alter-leave-to {
  opacity: 0;
}
</style>