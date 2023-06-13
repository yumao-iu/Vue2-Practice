<template>
  <div class="userLove">
    <p>
      <em>商品信息</em>
      <em>商品金额</em>
      <em>收藏时间</em>
      <em>编辑状态</em>
    </p>
    <div>
      <div
        v-for="(v1, i1) in orderData"
        :key="v1.gid"
        :class="`order_${v1.gid}`"
      >
        <div>
          <p><img :src="getImgUrl(v1)" /></p>
          <p class="introduce" @click="goodsDetail(v1.gid)">{{ v1.des }}</p>
        </div>
        <div>
          <i>{{ v1.price }}RMB</i>
        </div>
        <div>
          <i>{{ v1.time }}</i>
        </div>
        <div>
          <i @click="pay(v1, i1)">支付</i>
          <i @click="del(v1.gid)">删除</i>
        </div>
      </div>
    </div>
    <p>
      <i class="total">总计:{{ totalPrice }}RMB</i>
      <em @click="payAll">全部支付</em><em @click="delAll">全部删除</em>
    </p>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Alter from "../index/Alter.vue";
import api from "@/axios";
export default {
  async created() {
    let data = await api.getUserLove(this.userInfo.love);
    for (let a = 0; a < data.length; a++)
      this.orderData.push(this.goodsData.filter((v) => data[a].gid == v.id)[0]);
    this.orderData.reverse();
  },
  components: { Alter },
  data() {
    return {
      orderData: [],
    };
  },
  methods: {
    ...mapMutations(["changeShowAlter", "setUserPrice"]),
    getImgUrl(v) {
      console.log(v);
      return require(`@/assets/images/${JSON.parse(v.image)[0].name}`);
    },
    async pay(v, i) {
      let id = v.gid;
      let price = v.price;
      let myPrice = this.userInfo.price;
      let goodsPrice = price;
      if (this.hasLogin) {
        if (goodsPrice > myPrice)
          this.changeShowAlter({ message: "余额不足🥵" });
        else {
          let { state, price } = await api.buyGoods(id, "loveRemove");
          this.setUserPrice(price);
          if (state == 200) {
            this.changeShowAlter({ message: "购买成功😎" });
            this.orderData.splice(i, 1);
            this.userInfo.finishOrderNum++;
            this.userInfo.loveOrderNum--;
            this.userInfo.price -= parseInt(Number(goodsPrice) * 100) / 100;
            this.userInfo.love = this.userInfo.love
              .split(",")
              .filter((v) => id != v)
              .join(",");
          } else this.changeShowAlter({ message: "余额不足😎" });
        }
      } else this.changeShowAlter({ message: "请先登录😋" });
    },
    async del(gid) {
      this.userInfo.love = this.userInfo.love
        .split(",")
        .filter((v) => gid != v)
        .join(",");
      this.orderData = this.orderData.filter((v) => v.gid != gid);
      this.userInfo.loveOrderNum--;
      this.changeShowAlter({ message: "删除成功" });
      await api.delLove(gid);
    },
    async delAll() {
      let l = this.userInfo.love.split(",").length - 1;
      let data = this.userInfo.love.split(",");
      data.shift();
      console.log(data);
      for (let a = 0; a < data.length; a++) await api.delLove(data[a]);
      this.userInfo.love = null;
      this.orderData = "";
      this.userInfo.loveOrderNum -= l;
      this.changeShowAlter({ message: "删除成功" });
    },
    async payAll(v, i) {
      let id = v.gid;
      let price = this.totalPrice;
      let myPrice = this.userInfo.price;
      let goodsPrice = price;
      console.log(myPrice, goodsPrice);
      if (myPrice < goodsPrice) {
        this.changeShowAlter({ message: "余额不足🥵" });
      } else {
        let data = this.userInfo.love.split(",");
        data.shift();
        this.userInfo.loveOrderNum -= this.orderData.length;
        this.userInfo.love = this.orderData = "";
        this.userInfo.price -= parseInt(Number(price) * 100) / 100;
        this.userInfo.finishOrderNum += data.length;
        for (let a = 0; a < data.length; a++)
          await api.buyGoods(data[a], "loveRemove");
        this.changeShowAlter({ message: "购买成功😎" });
      }
    },
    goodsDetail(i) {
      this.$router.push({
        path: "/goods/" + i,
      });
    },
  },
  computed: {
    ...mapState([
      "goodsData",
      "userLove",
      "userInfo",
      "showAlterState",
      "hasLogin",
    ]),
    // orderData() {
    //   this.userLove.forEach((v) => {
    //     v.des = this.goodsData[v.goodsId].des;
    //     v.price = this.goodsData[v.goodsId].price;
    //   });
    //   return this.userLove;
    // },
    totalPrice() {
      if (this.orderData.length)
        return this.orderData.reduce(
          (pre, v) => parseInt((pre + Number(v.price)) * 100) / 100,
          0
        );
      else return 0;
    },
  },
};
</script>
<style lang="less" scoped>
.userLove {
  position: relative;
  width: 90%;
  margin: 22px auto 0 auto;
  > p:nth-of-type(1) {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(157, 151, 151, 0.2);
    height: 35px;
    line-height: 35px;
    margin-bottom: 30px;
    em {
      width: 25%;
      margin-right: 20px;
      // border: 1px solid gray;
    }
  }
  > p:nth-of-type(2) {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    bottom: -40px;
    i {
      margin-right: 50px;
    }
    em {
      border: 1px solid gray;
      margin-left: 20px;
      padding: 5px 10px;
      text-align: center;
      cursor: pointer;
      background: rgb(48, 46, 46);
      color: white;
    }
    em:nth-of-type(2) {
      background: transparent;
      border: 1px solid black;
      color: black;
    }
  }
  > div {
    height: 62vh;
    overflow: auto;
  }
  div[class^="order_"] {
    display: flex;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(157, 151, 151, 0.2);
    transition: all 1s;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid rgba(157, 151, 151, 1);
    }
    > div:nth-of-type(n + 2) {
      line-height: 60px;
    }
    > div:nth-of-type(1) {
      font-size: 13px;
      display: flex;
      width: 24.5%;
      margin-right: 1px;
      .introduce {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 3;
        margin-top: 5px;
        margin-right: 2px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    > div:nth-of-type(2) {
      width: 25%;
    }
    > div:nth-of-type(3) {
      width: 25%;
    }
    > div:nth-of-type(4) {
      flex-grow: 1;
      i {
        margin-right: 18px;
      }
    }
  }
  img {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    margin-bottom: 8px;
    cursor: pointer;
    border-radius: 3px;
    object-fit: cover;
  }
}
</style>