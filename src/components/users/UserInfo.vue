<template>
  <div class="userInfo">
    <div id="d1">
      <p class="title">用户资料:</p>
      <div class="inp">
        <div>
          <input
            type="text"
            placeholder="新名称"
            maxlength="15"
            v-model="userInfo.name"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="新账号"
            maxlength="15"
            v-model="userInfo.username"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="旧密码"
            maxlength="15"
            v-model="oldPassword"
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="新密码"
            maxlength="15"
            v-model="newPassword"
          />
        </div>
      </div>
      <p class="btn" @click="setUserInfo">确定修改</p>
    </div>
    <div id="d2">
      <p class="title">收货地址:</p>
      <div class="inp">
        <div>
          <input
            type="text"
            placeholder="收货地址"
            maxlength="30"
            v-model="userInfo.address"
          /><em @click="dingwei" class="yumao icon-dingwei"></em>
        </div>
      </div>
      <p class="btn" @click="setAddress">确定修改</p>
    </div>
    <div id="d3">
      <p class="title">其他信息:</p>
      <div class="inp">
        <div>
          <em>用户UID: {{ userInfo.id }}</em>
        </div>
        <div>
          <em>账户余额: {{ userInfo.price }}RMB</em><em @click="this.changeShowAlter({message:'时间原因,没有做🤡'})">充值</em>
        </div>
        <!-- <div>
          <em>交易订单: {{ userInfo.finishOrderNum }}件</em>
        </div>
        <div>
          <em>收藏商品: {{ loveNum }}件</em>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import Alter from "../index/Alter.vue";
import api from "@/axios";
export default {
  data() {
    return {
      where: "广东",
      oldPassword: "",
      newPassword: "",
    };
  },
  computed: {
    ...mapState(["showAlterState", "userInfo", "token", "tokenObj"]),
    loveNum() {
      let num = 0;
      if (!this.love) num = 0;
      else num = userInfo.love.split(",").length - 1;
      return num;
    },
  },
  components: { Alter },
  methods: {
    ...mapMutations(["changeShowAlter"]),
    dingwei() {
      var _this = this;
      var geolocation = new BMapGL.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMapGL.Marker(r.point);
          //  r.point.lng  r.point.lat
          var myGeo = new BMapGL.Geocoder();
          myGeo.getLocation(
            new BMapGL.Point(r.point.lng, r.point.lat),
            function (result) {
              if (result) _this.userInfo.address = result.address;
            }
          );
        } else {
          //   if (Number(this.getStatus()) == 8) this.dingwei();
          // if (Number(this.getStatus()) == 8)
          _this.changeShowAlter({ message: "您禁止了定位权限或者超时了" });
        }
      });
    },
    async setUserInfo() {
      let name = this.userInfo.name;
      let username = this.userInfo.username;
      let oldPassword = this.oldPassword;
      let newPassword = this.newPassword;
      if (!name || !username || !oldPassword || !newPassword)
        this.changeShowAlter({ message: "不能留空" });
      else if (name > 30) this.changeShowAlter({ message: "名称太长" });
      else {
        let { state } = await api.setUserInfo(
          name,
          username,
          oldPassword,
          newPassword
        );
        if (state == 500) {
          this.changeShowAlter({ message: "已经存在该账号" });
        } else if (state == 300) {
          this.changeShowAlter({ message: "原密码错误" });
        } else {
          this.changeShowAlter({ message: "修改成功" });
          this.newPassword = this.oldPassword = "";
        }
      }
    },
    async setAddress() {
      api.setUserAddress(this.userInfo.address);
      this.changeShowAlter({ message: "修改成功😎" });
    },
  },
  updated() {
    this.userInfo.name = this.userInfo.name.replace(" ", "");
    this.userInfo.username = this.userInfo.username.replace(" ", "");
    this.oldPassword = this.oldPassword.replace(" ", "");
    this.newPassword = this.newPassword.replace(" ", "");
  },
  mounted() {
    // this.tokenObj.a = 12;
    //展示中心地位点
    // var map = new BMapGL.Map("container");
    // var point = new BMapGL.Point(110.404, 39.915);
    // map.centerAndZoom(point, 15);
    //正地址解析
    // var map = new BMapGL.Map('container');
    // map.centerAndZoom(new BMapGL.Point(116.331398, 39.897445), 12);
    // var myGeo = new BMapGL.Geocoder();
    // myGeo.getPoint('广西', function (point) {
    //     if (point) {
    //         map.centerAndZoom(point, 16);
    //         map.addOverlay(new BMapGL.Marker(point, {
    //             title: '北京市海淀区上地10街'
    //         }))
    //     } else {
    //         alert('您选择的地址没有解析到结果！');
    //     }
    // }, '北京市')
    //逆地址解析
    // var myGeo = new BMapGL.Geocoder();
    // myGeo.getLocation(new BMapGL.Point(109.532342,24.390792), function (result) {
    //     if (result) window.textP.innerText = '你先在的地址大概在:' + result.address
    // });
    //浏览器定位
    // function position() {
    //   var geolocation = new BMapGL.Geolocation();
    //   geolocation.getCurrentPosition(function (r) {
    //     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //       var mk = new BMapGL.Marker(r.point);
    //       alert("您的位置：" + r.point.lng + "," + r.point.lat);
    //       var myGeo = new BMapGL.Geocoder();
    //       myGeo.getLocation(
    //         new BMapGL.Point(r.point.lng, r.point.lat),
    //         function (result) {
    //           if (result) alert(result.address);
    //         }
    //       );
    //     } else {
    //       alert(this.getStatus());
    //       if (Number(this.getStatus()) == 8) position();
    //     }
    //   });
    // }
    // position();
  },
};
</script>
<style lang="less" scoped>
.userInfo {
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  margin: 22px auto 0 auto;
  // border: 1px solid gray;
  #d1 {
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-right: 30px;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .inp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 5px;
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
  }
  #d2 {
    width: 40%;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .inp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 5px;
      > div {
        margin-bottom: 10px;
        border: 1px solid gray;
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        input {
          padding: 2px 0;
          box-sizing: border-box;
          width: 90%;
          font-size: 15px;
        }
        em {
          cursor: pointer;
          text-align: center;
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
  }
  #d3 {
    width: 40%;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }
    .inp {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 5px;
      > div {
        margin-bottom: 10px;
        height: 25px;
        display: flex;
        align-items: center;
        width: 100%;
        em {
          margin-right: 20px;
        }
        em:nth-of-type(2) {
          color: rgb(43, 87, 104);
          cursor: pointer;
        }
      }
    }
  }
}
</style>