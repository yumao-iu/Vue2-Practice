import axios from "axios";
axios.defaults.baseURL = 'http://127.0.0.1:3000/api'
axios.defaults.method = 'post'


export default {
    async getGoods() {
        let { data } = await axios({
            url: "/getGoods",
        })
        return data
    },
    async login(username,password) {
        let { data } = await axios({
            url: "/login",
            data: {username,password},
        })
        return data
    },
    async register(username, password) {
        let { data } = await axios({
            url: "/register",
            data: { username, password }
        })
        return data
    },
    async buyGoods(Gid, mode) {
        let { data } = await axios({
            url: '/buyGoods',
            params: { Gid, mode },
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async loveGoods(Gid) {
        let { data } = await axios({
            url: '/loveGoods',
            params: { Gid },
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async getUserOrder() {
        let { data } = await axios({
            url: '/getUserOrder',
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async getUserLove(loveStr) {
        let { data } = await axios({
            url: '/getUserLove',
            params: { loveStr },
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async setUserInfo(name, username, oldPassword, newPassword) {
        console.log(name, username, oldPassword, newPassword)
        let { data } = await axios({
            url: '/setUserInfo',
            data: {
                name, username, oldPassword, newPassword
            },
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async setUserAddress(address) {
        let { data } = await axios({
            url: '/setUserAddress',
            params: {
                address
            },
            headers: {
                authorization: JSON.parse(localStorage.getItem('userInfo')).token
            }
        })
        return data
    },
    async searchGoods(kw) {
        let { data } = await axios({
            url: '/searchGoods',
            params: { kw }
        })
        console.log(data)
        return data
    },
    async delLove(gid) {
        let { data } = await axios({
            url: '/delLove',
            params: { gid }
        })
        return data
    }
}