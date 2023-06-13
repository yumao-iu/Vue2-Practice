<template>
  <div id="IndexView">
    <Transition name="alter" mode="out-in" appear="">
      <Alter v-if="showAlterState" />
    </Transition>
    <header>
      <div id="header_center">
        <div class="d1">
          <span v-show="!hasLogin" @click="goLogin('登录')"
            >登陆</span
          >
          <span v-show="!hasLogin" @click="goLogin('注册')">注册</span>
          <span v-show="hasLogin" @click="goUser('/users')">我的</span>
          <span v-show="hasLogin" @click="quitLogin">退出</span>
          <span v-show="searchStr" @click="delSearch">取消搜索</span>
        </div>
        <div class="d2">
          <span @click="goWhere('UserOrder')">我的订单</span>
          <span @click="goWhere('UserLove')">我的收藏</span>
        </div>
      </div>
    </header>
    <div id="index-d1">
      <div id="logo">
        <img src="@/assets/images/logo.png" alt="" />
      </div>
      <div id="search">
        <div id="search_top">
          <span>
            <em>商品</em>
          </span>
          <input
            type="text"
            size="20"
            maxlength="20"
            v-model="searchData"
            @keydown.enter="search(searchData)"
          />
          <span @click="search(searchData)">搜索</span>
        </div>
        <div id="search_bottom">
          <i v-for="v1 in indexSortData1" :key="v1" @click="search(v1)">{{
            v1
          }}</i>
        </div>
      </div>
    </div>
    <div id="index-d2">
      <div class="d1">
        <ul>
          <li>分类</li>
          <li v-for="(v1, i2) in indexSortData2" :key="i2">
            <i :class="`yumao ` + v1.iconfont"></i
            ><i @click="search(v1.data[0])">{{ v1.data[0] }}</i
            ><i>/</i><i @click="search(v1.data[1])">{{ v1.data[1] }}</i
            ><i>/</i><i @click="search(v1.data[2])">{{ v1.data[2] }}</i>
          </li>
        </ul>
      </div>
      <div class="d2">
        <div class="dd1">
          <div id="navigation">
            <p class="top">
              <em>{{ bannerName }}! 恭贺新春! 英雄联盟 兔年限定 春节皮肤</em>
              <em class="navigatorEl">
                <i class="prevEl">&lt;</i>
                <i class="nextEl">&gt;</i>
              </em>
            </p>
            <p class="bottom">
              <em> </em>
            </p>
          </div>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(v1, i1) in bannerData"
                :key="v1"
              >
                <img
                  :src="getBannerImgUrl(i1 + 1)"
                  @click="goodsDetail(i1 + 17)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d3">
        <Transition name="transition_1" mode="out-in">
          <div v-if="loginState == 1" key="login" class="login">
            <p class="profile">
              <img src="@/assets/images/profile.jpg" />
            </p>
            <div class="usernameIpt">
              <em class="yumao icon-yonghu"></em
              ><input type="text" maxlength="15" v-model="username" />
            </div>
            <div class="passwordIpt">
              <em class="yumao icon-yanjing"></em
              ><input type="password" maxlength="15" v-model="password" />
            </div>
            <p class="goBack"><em @click="goGuest">返回</em></p>
            <div @click="loginOrRegster">{{ btnName }}</div>
          </div>
          <div v-else class="guest" key="guest">
            <div class="dd1">
              <img src="@/assets/images/profile.jpg" alt="" />
            </div>
            <div class="dd2">Hi,你好</div>
            <div class="dd3" v-show="hasLogin">
              <p @click="goUser">{{ userInfo.name }}</p>
            </div>
            <div class="dd3" v-show="!userInfo.name">
              <em @click="goLogin('登录')">登陆</em>
              <em @click="goLogin('注册')">注册</em>
              <em
                @click="
                  changeShowAlter({ state: 1, message: '该功能没有做 🤡' })
                "
                >开店</em
              >
            </div>
            <div class="dd4">
              <span @click="goWhere('UserOrder')">
                <em class="yumao icon-juanzeng"></em>
                <em>我的订单</em>
              </span>
              <span @click="goWhere('UserLove')">
                <em class="yumao icon-biaoqing"></em>
                <em>我的收藏</em>
              </span>
              <span @click="goWhere('UserInfo')">
                <em class="yumao icon-biji"></em>
                <em>我的余额</em>
              </span>
              <span @click="goWhere('UserSend')">
                <em class="yumao icon-fasong"></em>
                <em>发布商品</em>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
    <div id="index-d3">
      <i v-show="!searchStr">随机推荐</i>
      <i v-show="searchStr">搜索结果</i>
      <div>
        <div
          id="100"
          v-for="v1 in goodsData"
          :key="v1.id"
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
import "swiper/dist/js/swiper.js";
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
import $ from "jquery";
import { mapState, mapActions, mapMutations } from "vuex";
import Alter from "../components/index/Alter.vue";
import api from "../axios";
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      loginState: 0,
      bannerName: "",
      username: "",
      password: "",
      btnName: "登录",
      searchData: "",
      tempBox: "",
      searchStr: "",
    };
  },
  computed: {
    ...mapState([
      "test",
      "where",
      "hasLogin",
      "showAlterState",
      "showAlterMessage",
      "goodsData",
      "bannerData",
      "indexSortData1",
      "indexSortData2",
      "userInfo",
    ]),
  },
  methods: {
    ...mapActions(["goIndex"]),
    ...mapMutations([
      "setTest",
      "setWhere",
      "quitLogin",
      "changeShowAlter",
      "setToken",
      "setUserInfo",
      "loginSuccess",
      "registerSuccess",
      "setIndexGoods",
    ]),
    throttle(fn, wait) {
      let timer = null;
      return function () {
        if (timer) clearInterval(timer);
        setTimeout(() => {
          fn.apply(this, arguments);
        }, wait);
      };
    },

    async search(i) {
      // if (!this.searchData.replace(/s+/g, "")) return;
      if (i) this.searchData = i;
      let data = await api.searchGoods(this.searchData);
      if (!data.length)
        this.changeShowAlter({ message: "搜索不到你想的信息🤡" });
      else {
        this.searchStr = "搜索结果";
        this.changeShowAlter({ message: `搜索到总计${data.length}条商品信息` });
        this.tempBox = this.goodsData;
        this.setIndexGoods(data);
        // this.goodsData = data
      }
    },
    delSearch() {
      this.searchStr = "";
      this.setIndexGoods(this.tempBox);
    },
    goWhere(v) {
      if (!this.hasLogin) {
        this.changeShowAlter({ message: "请先登录😅" });
        return;
      }
      this.$router.push({ path: "/users/" + this.userInfo.id });
      this.setWhere(v);
    },
    goLogin(v) {
      this.loginState = 1;
      this.btnName = v;
      // this.changeShowAlter({state:1,message:'请先登录'});
    },
    goGuest() {
      this.loginState = 0;
      this.username = this.password = "";
    },
    goUser(path = "/home") {
      this.$router.push({ path: "/users/" + this.userInfo.id });
    },
    async loginOrRegster() {
      let u = this.username;
      let p = this.password;
      let l1 = u.length;
      let l2 = p.length;
      if (l1 < 6 || l2 < 6) {
        this.changeShowAlter({ message: "账号或者密码至少6位 🤡" });
        return;
      }
      if (this.btnName == "登录") {
        let data = await api.login(u, p);
        this.loginSuccess(data);
        if (data.token) this.loginState = this.username = this.password = "";
      } else {
        let data = await api.register(u, p);
        this.registerSuccess(data);
        if (data.token) this.loginState = this.username = this.password = "";
      }
    },
    getImgUrl(v) {
      return require(`@/assets/images/${JSON.parse(v.image)[0].name}`);
    },
    getBannerImgUrl(i) {
      return require(`@/assets/images/banner${i}.jpg`);
    },
    goodsDetail(i) {
      this.$router.push({ path: "/goods/" + i });
    },
  },
  components: { Alter },
  updated() {
    this.username = this.username.replace(/\D+/gi, "");
    this.password = this.password.replace(/\s+/gi, "");
  },
  mounted() {
    console.log("我是首页.vue");
    let _this = this;
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      navigation: {
        prevEl: ".prevEl",
        nextEl: ".nextEl",
      },
      pagination: {
        el: "#navigation .bottom em", //父元素
        bulletElement: "i", //渲染成什么元素
        clickable: true,
      },
      on: {
        slideChangeTransitionEnd: function () {
          _this.bannerName = _this.bannerData[this.realIndex];
          //开启loop错误activeIndex,应该使用readIndex
        },
      },
    });
  },
};
</script>
<style lang="less">
header {
  width: 100%;
  height: 50px;
  background: white;
  box-shadow: 0 2px rgba(186, 179, 179, 0.2);
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
      span {
        margin-left: 20px;
      }
    }
  }
}
#index-d1 {
  display: flex;
  align-items: center;
  width: 85%;
  max-width: 1280px;
  // border: 1px solid gray;
  margin: 45px auto;
  img {
    // width: 100px;
    height: 60px;
    object-fit: cover;
  }
  #logo {
    margin-right: 40px;
    margin-left: 80px;
    cursor: pointer;
  }
  #search {
    width: 70%;
    display: flex;
    flex-direction: column;
    #search_top {
      width: 100%;
      height: 40px;
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid rgb(255, 119, 0);
      margin-bottom: 15px;
      transition: all 1s;
      span {
        cursor: pointer;
      }
      span:nth-of-type(1) {
        height: 32px;
        line-height: 32px;
        width: 60px;
        text-align: center;
        margin-left: 10px;
      }
      span:nth-of-type(2) {
        height: 32px;
        line-height: 32px;
        border-radius: 32px;
        width: 70px;
        text-align: center;
        margin-right: 5px;
        color: white;
        background-image: linear-gradient(135deg, #fccf31 10%, #f55555 100%);
      }
      input {
        height: 80%;
        width: 84%;
        font-size: 16px;
        margin: 0 10px 0 0;
      }
    }
    #search_bottom {
      display: flex;
      margin-left: 20px;
      font-size: 14px;
      i {
        margin-right: 30px;
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
          color: rgb(197, 165, 91);
        }
      }
    }
  }
}
#index-d2 {
  display: flex;
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: rgb(255, 255, 255);
  border: 0.1px solid transparent;
  > div {
    margin-top: 20px;
  }
  .d1 {
    width: 23%;
    height: 300px;
    border: 1px solid transparent;
    margin-left: 20px;
    background: rgb(247, 249, 250);
    border-radius: 5px;
    margin-right: 20px;
    ul {
      margin-top: 20px;
    }
    li:nth-of-type(1) {
      font-weight: 700;
      font-size: 20px;
      margin-bottom: 15px;
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      margin-left: 20px;
      i {
        margin-right: 18px;
      }
      i:nth-of-type(2n) {
        cursor: pointer;
        transition: all 0.6s;
        &:hover {
          color: rgb(197, 165, 91);
        }
      }
    }
  }
  .d2 {
    width: 40%;
    height: 300px;
    margin-right: 40px;

    .dd1 {
      position: relative;
      width: 100%;
      height: 285px;
      margin-top: 18px;
      #navigation {
        position: absolute;
        width: 100%;
        z-index: 2;
        bottom: 0;
        left: 0;
        background: rgba(151, 138, 138, 0.6);
        display: flex;
        align-items: center;
        flex-direction: column;
        color: white;
        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 90%;
          margin: 10px 0;
          font-size: 18px;
          em:nth-child(1) {
            width: 85%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .navigatorEl {
            display: flex;
            i {
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              border-radius: 3px;
              background: rgba(179, 174, 174, 0.3);
              margin-left: 8px;
              cursor: pointer;
              transition: all 1s;
              &:hover {
                background: rgba(179, 174, 174, 0.7);
              }
            }
          }
        }
        .bottom {
          margin-bottom: 10px;
          width: 90%;
          display: flex;
          > em {
            height: 15px;
            border-radius: 15px;
            display: flex;
            align-items: center;
            background: rgba(64, 52, 52, 0.6);
            > i {
              width: 11px;
              height: 11px;
              border-radius: 50%;
              background: rgba(255, 255, 255, 1);
              margin-right: 6px;
              cursor: pointer;
              transition: all 0.6s;
            }
            i:nth-of-type(1) {
              margin-left: 6px;
            }
          }
        }
      }
      .swiper-container {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        cursor: pointer;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  .d3 {
    width: 28%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
    .login {
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .profile {
        margin-bottom: 30px;
        img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }
      }

      .goBack {
        width: 80%;
        display: flex;
        justify-content: flex-end;
        font-size: 15px;
        margin-bottom: 15px;
        em {
          padding: 0 2px;
          cursor: pointer;
        }
      }

      > div:nth-of-type(-n + 2) {
        display: flex;
        align-items: center;
        border: 1px solid gray;
        height: 35px;
        margin-bottom: 30px;
        border-radius: 10px;
        transition: all 0.8s;
        box-shadow: 0 0 0 2px transparent;
        &:focus-within {
          box-shadow: 0 0 0 2px rgb(232, 97, 39);
          border: 1px solid rgb(232, 97, 39);
        }
        .yumao {
          width: 15%;
          height: 100%;
          line-height: 35px;
          text-align: center;
          font-size: 25px;
          color: gray;
        }
        input {
          font-size: 20px;
        }
      }
      > div {
        width: 80%;
        transition: all 1s;
      }
      > div:nth-last-of-type(1) {
        background: linear-gradient(
          45deg,
          rgb(251, 187, 55),
          rgb(246, 114, 76)
        );
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: white;
        font-size: 18px;
        border-radius: 10px;
        cursor: pointer;
      }
      div.passwordIpt {
        margin-bottom: 15px;
      }
    }
    .guest {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .dd1 {
        margin-bottom: 30px;
        img {
          width: 65px;
          height: 65px;
          border-radius: 50%;
        }
      }
      .dd2 {
        font-size: 23px;
        margin-bottom: 30px;
      }
      .dd3 {
        display: flex;
        justify-content: space-between;
        width: 90%;
        margin-bottom: 30px;
        p {
          text-align: center;
          width: 100%;
          font-size: 28px;
          cursor: pointer;
        }
        em {
          width: 28%;
          height: 35px;
          border-radius: 35px;
          line-height: 40px;
          text-align: center;
          background: gray;
          color: white;
          cursor: pointer;
        }
        em:nth-of-type(1) {
          background: linear-gradient(
            45deg,
            rgb(251, 191, 54),
            rgb(246, 109, 78)
          );
        }
        em:nth-of-type(2) {
          background: linear-gradient(45deg, rgb(255, 80, 0), rgb(255, 113, 0));
        }
        em:nth-of-type(3) {
          border: 1px solid rgb(246, 109, 78);
          color: rgb(246, 109, 78);
          background: transparent;
        }
      }
      .dd4 {
        display: flex;
        .yumao {
          font-size: 25px;
        }
        span {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin: 0 12px;
          cursor: pointer;
          em {
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
#index-d3 {
  width: 95%;
  max-width: 1400px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  > i {
    font-size: 20px;
    font-weight: 700;
    width: 93.2%;
    height: 20px;
    margin-top: 70px;
    margin-bottom: 25px;
  }
  > div {
    width: 93.2%;
    // border: 1px solid gray;
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
  transform: translateX(10px);
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