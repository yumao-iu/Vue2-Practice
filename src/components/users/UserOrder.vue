<template>
  <div class="userOrder">
    <p>
      <em>商品信息</em>
      <em>商品金额</em>
      <em>交易时间</em>
      <em>交易状态</em>
    </p>
    <div>
      <div v-for="v1 in orderData" :key="v1.id" :class="`order_${v1.id}`">
        <div>
          <p><img :src="getImgUrl(v1)" /></p>
          <p class="introduce" @click="goodsDetail(v1.id)">{{ v1.des }}</p>
        </div>
        <div>
          <i>{{ v1.price }}RMB</i>
        </div>
        <div>
          <i>{{ v1.time }}</i>
        </div>
        <div>
          <i>假设完成交易</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import api from "@/axios";
export default {
  data() {
    return {
      orderData: [],
    };
  },
  computed: {
    ...mapState(["goodsData", "userOrder"]),
    // orderData() {
    //   this.userOrder.forEach((v) => {
    //     v.des = this.goodsData[v.goodsId].des;
    //     v.price = this.goodsData[v.goodsId].price;
    //     v.state = v.state.split(",")[1];
    //   });
    //   return this.userOrder;
    // },
  },
  methods: {
    getImgUrl(v) {
      return require(`@/assets/images/${JSON.parse(v.image)[0].name}`);
    },
    goodsDetail(i) {
      this.$router.push({
        path: "/goods/" + i,
      });
    },
  },
  async mounted() {
    console.log("我是order");
    let data = await api.getUserOrder();
    // console.log(data);
    for (let a = 0; a < data.length; a++) {
      let v = this.goodsData.filter((v1) => data[a].gId == v1.id);
      this.orderData.push(v[0]);
    }
    this.orderData.reverse();
    console.log(this.orderData[0]);
  },
};
</script>
<style lang="less" scoped>
.userOrder {
  width: 90%;
  margin: 22px auto 0 auto;
  > p {
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
  > div {
    height: 65vh;
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
    > div {
      // border: 1px solid gray;
      // text-align: center;
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
      width: 25.5%;
    }
    > div:nth-of-type(4) {
      flex-grow: 1;
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