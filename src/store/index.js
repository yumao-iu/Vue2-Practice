import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import api from '@/axios/index'
Vue.use(Vuex)
export default new Store({
  state: {
    showAlterState: 0,
    showAlterMessage: '',
    hasLogin: false,
    where: 'UserOrder',
    test: '测试',
    goodsData: [
      {
        id: 1,
        tag: '001,绘画,艺术品',
        des: '加载中,请稍等',
        sort: '分类',
        price: 129.00,
        image: '[{"name":"goods1.jpg"}]',
        extra: `'{"author":"@mipi"}'`
      },
    ],
    userOrder: [
      {
        id: 1,
        goodsId: 1,
        time: '2020-12-01 01:20:00',
        state: '200,交易完成'
      },
      {
        id: 2,
        goodsId: 2,
        time: '2020-12-12 06:12:00',
        state: '200,交易完成'
      },
      {
        id: 3,
        goodsId: 3,
        time: '2020-12-13 09:12:00',
        state: '200,交易完成'
      },
      {
        id: 4,
        goodsId: 5,
        time: '2020-12-15 12:12:00',
        state: '200,交易完成'
      },
    ],
    userLove: [
      {
        id: 1,
        goodsId: 1,
        time: '2022-12-01 12:00:00',
      },
      {
        id: 2,
        goodsId: 3,
        time: '2022-12-12 00:12:12',
      },
      {
        id: 3,
        goodsId: 4,
        time: '2022-12-14 01:12:12',
      },
      {
        id: 4,
        goodsId: 5,
        time: '2022-12-30 02:12:12',
      },
    ],
    userInfo: {
      id: 0,
      name: "",
      userName: '',
      address: '',
      price: 0,
      finishOrderNum: 0,
      loveOrderNum: 0,
    },
    bannerData: ['刀妹🥵', '婕拉🤔', '加里奥😑', '盖伦🤐', '鳄鱼🤯', '大聪明🤔', '超模😥', '寒冰🥰'],
    indexSortData1: ['艺术', '画稿', '色彩', '初音', '壁纸', '插画', '唤水', '女巫', '未来', '淋漓尽致', '英雄联盟', '游戏皮肤'],
    indexSortData2: [
      {
        iconfont: 'icon-shouye',
        data: ['艺术', '画稿', '色彩'],
      },
      {
        iconfont: 'icon-wodeguanzhu',
        data: ['壁纸', '未来', '初音'],
      },
      {
        iconfont: 'icon-dingdan',
        data: ['插画', '唤水', '女巫'],
      },
      {
        iconfont: 'icon-rili',
        data: ['游戏', '皮肤', '道具'],
      },
      {
        iconfont: 'icon-shouye',
        data: ['新春', '刀妹', '聪明'],
      },
      {
        iconfont: 'icon-xiaoxi',
        data: ['色彩', '画稿', '英雄'],
      },
      {
        iconfont: 'icon-yonghu',
        data: ['画稿', '艺术', '色彩'],
      }
    ],
  },
  actions: {
    goIndex() {
      location.href = '../'
    }
  },
  mutations: {
    getGoods(s, val) {
      s.goodsData = val
    },
    changeShowAlter(s, { message, code = 1 }) {
      s.showAlterState = code
      s.showAlterMessage = message
    },
    setUserInfo(s, v) {
      s.userInfo = v
    },
    loginSuccess(s, v) {
      let { token } = v
      if (!token) {
        this.commit('changeShowAlter', { message: "账号或者密码错误😥" })
        return
      }
      v.loginTime = new Date().getTime()
      s.hasLogin = true
      localStorage.setItem('userInfo', JSON.stringify(v))
      this.commit('setUserInfo', v)
      this.commit('changeShowAlter', { message: "登陆成功😎!" })
    },
    registerSuccess(s, v) {
      let { id, token, name, username, price, loveOrderNum, finishOrderNum } = v
      if (!token) {
        this.commit('changeShowAlter', { message: "抱歉,用户名已经存在😥" })
        return
      }
      v.loginTime = new Date().getTime()
      s.hasLogin = true
      localStorage.setItem('userInfo', JSON.stringify(v))
      this.commit('setUserInfo', v)
      this.commit('changeShowAlter', { message: "注册成功😎!" })
    },
    checkHasLogin(s, v) {  //
      if (!v) return
      s.hasLogin = true
      s.userInfo = v
    },
    quitLogin(s, v) {
      s.hasLogin = false
      s.userInfo = ''
      localStorage.removeItem('userInfo')
    },
    setWhere(s, v) {
      s.where = v
    },
    setUserPrice(s, v) {
      s.userInfo.price = v
      console.log(s.userInfo.price);
    },
    setIndexGoods(s, v) {
      console.log(1211)
      s.goodsData = v
    },
    setTest(v) {
      v.test = '12'
    }
  },
  // getters: {
  // },
  // modules: {
  // },
  // plugins: [createPersistedState()] //不存储
})
