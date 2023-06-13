<template>
  <div class="userSend">
    <div id="d1">
      <p class="title">发布商品:</p>
      <div class="inp">
        <i>商品描述:</i>
        <div>
          <input
            type="text"
            placeholder="商品描述"
            maxlength="30"
            v-model="goodDes"
          />
        </div>
        <i>商品分类:</i>
        <div>
          <input
            type="text"
            placeholder="商品分类"
            maxlength="20"
            v-model="goodSort"
          />
        </div>
        <i>商品标签:</i>
        <div>
          <input
            type="text"
            placeholder="商品标签"
            maxlength="20"
            v-model="goodTag"
          />
        </div>
        <i>商品价格:</i>
        <div>
          <input
            type="text"
            placeholder="商品价格"
            maxlength="15"
            v-model="goodPrice"
          />
        </div>
      </div>
      <p class="btn" @click="sendGood">发布商品</p>
      <input type="file" id="inpFile" style="display: none" />
    </div>
    <div id="d2">
      <p class="title">图片上传:</p>
      <p class="imgProfile" @click="uploadImg">点击此处上传图片</p>
      <p class="imgPosition">
        <Transition name="yumao" mode="out-in">
          <img :src="imgSrc" v-show="showImg" />
        </Transition>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Alter from "../index/Alter.vue";
// import api from "@/axios";
import axios from "axios";
import $ from "jquery";
// import func from "vue-editor-bridge";
export default {
  activated() {
    // console.log();
  },
  components: { Alter },
  data() {
    return {
      goodDes: "",
      goodSort: "",
      goodTag: "",
      goodPrice: "",
      showImg: false,
      imgSrc: "",
    };
  },
  methods: {
    ...mapMutations(["changeShowAlter", "setUserPrice", "setWhere"]),
    uploadImg() {
      document.getElementById("inpFile").click();
      this.showImg = false;
    },
    async sendGood() {
      // /(^[1-9][0-9]{0,7}$)|(^((0\.0[1-9]$)|(^0\.[1-9]\d?)$)|(^[1-9][0-9]{0,7}\.\d{1,2})$)/
      let files = document.getElementById("inpFile").files;
      let goodDes = this.goodDes;
      let goodSort = this.goodSort;
      let goodTag = this.goodTag;
      let goodPrice = this.goodPrice;
      let token = JSON.parse(localStorage.getItem("userInfo")).token;
      if (!files.length) return;
      if (!this.goodDes) return;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append(
        "goodsInfo",
        JSON.stringify({ goodDes, goodSort, goodTag, goodPrice })
      );
      const res = await axios({
        url: "/sendGood",
        data: formData,
        headers: {
          authorization: token,
        },
      });
      let { data } = res;
      if (data.state == 200) {
        this.changeShowAlter({ message: "发布成功 🧐" });
        this.goodDes = this.goodSort = this.goodTag = this.goodPrice = "";
        this.showImg = false;
        setTimeout(() => {
          location.href = location.href;
          this.setWhere("UserGoods");
        }, 1500);
      }
    },
  },
  mounted() {
    console.log("我是send");
    let file = document.getElementById("inpFile");
    let _this = this;
    file.onchange = () => {
      let f = file.files;
      let reader = new FileReader();
      reader.readAsDataURL(f[0]);
      reader.onload = () => {
        _this.showImg = true;
        _this.imgSrc = reader.result;
      };
    };
  },
  computed: {
    ...mapState([
      "goodsData",
      "userLove",
      "userInfo",
      "showAlterState",
      "hasLogin",
    ]),
  },
};
</script>
<style lang="less" scoped>
.userSend {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 22px auto 0 auto;
  // border: 1px solid gray;
  #d1 {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-right: 50px;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .inp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 15px;
      > i {
        margin: 11px 0;
        margin-top: 18px;
      }
      > div {
        margin-bottom: 10px;
        border: 1px solid gray;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 90%;
        input {
          padding: 2px 0;
          box-sizing: border-box;
          width: 90%;
          font-size: 15px;
        }
      }
    }
    .btn {
      width: 80px;
      padding: 5px 0;
      color: black;
      border: 1px solid black;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
    }
    .picProfile {
      cursor: pointer;
    }
    .picPosition {
      height: 200px;
      height: 200px;
      img {
        height: 200px;
        height: 200px;
        object-fit: cover;
      }
    }
  }
  #d2 {
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .imgProfile {
      border: 1px solid gray;
      height: 25px;
      line-height: 25px;
      width: 180px;
      cursor: pointer;
      text-align: center;
      margin-bottom: 20.5px;
    }
    .imgPosition {
      img {
        width: 200px;
        height: 200px;
        border-radius: 2px;
        transition: all 1s;
        object-fit: cover;
      }
    }
  }
  .yumao-enter-active,
  .yumao-leave-active {
    transition: all 0.5s;
  }
  .yumao-enter,
  .yumao-leave-to {
    opacity: 0;
  }
}
</style>