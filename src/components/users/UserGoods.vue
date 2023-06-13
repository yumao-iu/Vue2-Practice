<template>
  <div class="userGoods">
    <p>
      <em>商品信息</em>
      <em>商品金额</em>
      <em>发布时间</em>
      <em>编辑状态</em>
    </p>
    <div>
      <div v-for="v1,i1 in userGoodsData" :key="v1.id" :class="`order_${v1.gid}`">
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
          <!-- <i>编辑</i> -->
          <i @click="del(v1,i1)">删除商品</i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Alter from "../index/Alter.vue";
import axios from "axios";
export default {
  async mounted() {
    const { data } = await axios({
      url: "/getUserGoods",
      headers: {
        authorization: JSON.parse(localStorage.getItem("userInfo")).token,
      },
    });
    this.userGoodsData = data.data;
  },
  components: { Alter },
  data() {
    return {
      userGoodsData: "",
    };
  },
  methods: {
    ...mapMutations(["changeShowAlter", "setUserPrice"]),
    getImgUrl(v) {
      return require(`@/assets/images/${JSON.parse(v.image)[0].name}`);
    },
    goodsDetail(i) {
      this.$router.push({
        path: "/goods/" + i,
      });
    },
    async del(v,i) {
      let { id } = v;
      this.userGoodsData.splice(i,1)
      this.changeShowAlter({ message: "删除成功😎" });
      let token = JSON.parse(localStorage.getItem("userInfo")).token;
      const {data} = await axios({
        url: "/delGoods",
        data: { id },
        headers: {
          authorization: token,
        },
      });
      console.log(data)
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
.userGoods {
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