const express = require('express')
const route = express.Router()
const { db } = require('./config')
const multer = require('multer')//目录相对于项目文件中node_modules
const jwt = require('jsonwebtoken')
const fs = require('fs')//目录相对于项目文件中node_modules
let upload = multer({
    dest: './src/assets/images',//这个目录相对于项目文件中node_modules
    limits: {
        files: 1,
        fields: 5,
        fileSize: 10.5 * 1024 * 1024
    }
}).array('file', 9)
function setTableData(tableName, id, filed, value) {
    db.query(`update ${tableName} set ${filed} = ? where id = ?`, [value, id], (err, result) => {
        if (err) console.log(err)
    })
}
function getTableData(tableName, id, filed = '*') {
    console.log(id)
    return new Promise((solve, reject) => {
        db.query(`select ${filed} from ${tableName} where id = ?`, id, (err, result) => {
            if (result) solve(result[0][filed])
            else console.log(err.message, 7)
        })
    })
}
async function setTableExtra(tableName, id, key, val, option = { mode: 0 }) {
    let mode = option.mode
    let extra = await getTableData(tableName, id, 'extra')
    if (!extra) extra = JSON.stringify({ yumao: 1 })
    extra = JSON.parse(extra)
    if (!key in extra) extra[key] = val
    if (option.mode == 0) { extra[key] = val; }
    else if (mode == 'add') { extra[key] += 1; }
    else if (mode == 'reduce') { extra[key] -= 1 }
    else if (mode == 'remove') { delete extra[key]; }
    setTableData(tableName, id, 'extra', JSON.stringify(extra))
}
function getToken(val, time) {
    return jwt.sign(val, 'yumao', { expiresIn: time })
}
function verifyToken(token) {
    return jwt.verify(token, 'yumao', (err, result) => {
        return result
    })
}
function getGoods(num) {
    return new Promise((solve, reject) => {
        db.query('select * from goods order by id limit ?', [num], (err, result) => {
            if (result) solve(result)
            else console.log(err.message, 6);
        })
    })
}
function getGoodsId(id) {
    return new Promise((solve, reject) => {
        db.query('select * from goods where id = ?', id, (err, result) => {
            if (result) solve(result)
            else console.log(err.message, 6);
        })
    })
}
function getUsers(num) {
    return new Promise((solve, reject) => {
        db.query('select * from users order by id limit ?', [num], (err, result) => {
            if (result) solve(result)
            else console.log(err.message, 5);
        })
    })
}
function getUserInfo(id = 0, username = 0) {
    return new Promise((solve, reject) => {
        db.query("select * from users where id = ? or username = ?", [id, username], (err, result) => {
            if (result) solve(result[0])
            else console.log(err.message, 3);
        })
    })
}
function insertUser(username, password) {
    let name = '阳光彩虹小白马-' + Math.floor(Math.random() * 10000 + 1);
    let u = username
    let p = password
    let extra = JSON.stringify({
        price: 1000,
        finishOrderNum: 0,
        loveOrderNum: 0,
        address: '火星',
        state: 1,
    })
    db.query('insert into users(name,username,password,extra) value(?,?,?,?)', [name, u, p, extra], (err, result) => {
        if (err) console.log(err.message);
    })
}
async function insertBuy(uid, gid, des, price) {
    return new Promise((s) => {
        db.query('insert into buy(uId,gId,des,price) value(?,?,?,?)', [uid, gid, des, price], (err, result) => { if (err) { console.log(err.message) } else s(result) })
    })
}
function getDetailLove(uid, gid) {
    return new Promise((solve, reject) => {
        db.query('select * from love where uid = ? and gid = ?', [uid, gid], (err, result) => {
            if (result) solve(result.length)
            else console.log(err.message, 2)
        })
    })

}
function delLove(uid, gid) {
    db.query('delete from love where uid = ? and gid = ?', [uid, gid], (err, result) => {
        if (err) console.log(err)
        else {
            setTableExtra('users', uid, 'loveOrderNum', 0, { mode: 'remove' })
        }
    })
}
function randomStr(type = 'a', num = 10) {
    let data = ''
    for (let a = 0; a < num; a++) {
        if (type == 'a') data += String.fromCharCode(Math.ceil(Math.random() * 25 + 97))
        else data += String.fromCharCode(Math.ceil(Math.random() * 25 + 65))
    }
    return data
}
function insertGoods(uid, tag, des, sort, image, price, extra) {
    db.query('insert into goods(uid,tag,des,sort,image,price,extra) value(?,?,?,?,?,?,?)', [uid, tag, des, sort, image, price, extra], (err, result) => {
        if (err) console.log(err.message, 121);
    })
}
function delGoods(id) {
    db.query('delete from goods where id =?', id, (err, result) => {
        if (err) console.log(err.message, 126)
    })
}
async function searchGoods(kw) {
    let data = `%${kw}%`
    return new Promise((solve, reject) => {
        db.query("select * from goods where des like ?", data, (err, result) => {
            if (result) solve(result)
            else console.log(err.message, 1)
        })
    })
}
async function insertLove(uid, gid, des, price) {
    db.query('insert into love(uid,gid,des,price) value(?,?,?,?)', [uid, gid, des, price], (err, result) => {
        if (err) console.log(err)
    })
}
async function buyGoods(uid, gid) {
    let buy = await getTableData('users', uid, 'buy')
    let temp = ''
    if (!buy) temp = gid
    else temp = buy.split(',').concat(gid).join(',')
    let des = await getTableData('goods', gid, 'des')
    let price = await getTableData('goods', gid, 'price')
    await insertBuy(uid, gid, des, price)
    setTableData('users', uid, 'buy', temp)
}
async function editPrice(uid, priceNum, option = { mode: 'normal' }) {
    let { mode } = option
    priceNum = Number(priceNum)
    let extra = await getTableData('users', uid, 'extra')
    let originPrice = JSON.parse(extra).price
    let price = ''
    let state = 200
    if (mode == 'add') {
        price = parseInt((originPrice + priceNum) * 100) / 100
        setTableExtra('users', uid, 'price', price)
    } else if (mode == 'remove' && originPrice > priceNum) {
        price = parseInt((originPrice - priceNum) * 100) / 100
        setTableExtra('users', uid, 'price', price)
        // setTableExtra('users', uid, 'finishOrderNum', 0, { mode: 'add' })
    } else if (mode == 'remove' && originPrice < priceNum) { state = 500, price = originPrice }
    else if (mode == 'normal') setTableExtra('users', uid, 'price', priceNum)
    console.log(price)
    return new Promise((solve, reject) => {
        solve({ state, price })
    })
}
async function loveGoods(uid, gid) {
    let data = await getTableData('users', uid, 'love')
    if (!data) data = ''
    let state = 500
    if (data.indexOf(gid) == -1) {
        if (!data) newData = gid
        else newData = data.split(',').concat(gid).join(',')
        state = 200
        setTableData('users', uid, 'love', data.split(',').concat(gid).join(','))
    }
    return state
}
async function getUserOrder(uid) {
    return new Promise((solve, reject) => {
        db.query('select * from buy where uId = ?', uid, (err, result) => {
            if (result) solve(result)
            if (err) console.log(err.message)
        })
    })
}
async function getUserLove(uid) {
    return new Promise((solve, reject) => {
        //sql 有风险
        db.query(`select * from love where  uid = ?`, uid, (err, result) => {
            if (result) solve(result)
            if (err) console.log(err.message, 0)
        })
    })
}
async function setUserInfo(uid, name, username, oldPassword, newPassword) {
    console.log(uid, name, username, oldPassword, newPassword)
    let allUser = await getUsers(999)
    let userData = await getTableData('users', uid, 'password')
    let state = 500
    if (userData != oldPassword) {
        state = 300
        return state
    }
    for (let a = 0; a < allUser.length; a++)
        if (username == allUser[a].username && allUser[a].id != uid)
            return state
    db.query('update users set name=?,username=?,password=? where id = ?', [name, username, newPassword, uid], (err, data) => {
        if (err) console.log(err.message, 9)
    })
    state = 200
    return state

}
async function getUserGoods(uid) {
    return new Promise((solve, reject) => {
        db.query('select * from goods where uid = ?', uid, (err, result) => {
            if (result) solve(result)
            else console.log(err.message, 222)
        })
    })
}
function cs() {
    setTableExtra('users', 44, 'price', 1954.1);
}
function checkAuthMiddle(req, res, next) {
    let token = req.headers.authorization
    let verifyData = verifyToken(token)
    req.flag = 0
    if (verifyData && 'u' in verifyData) {
        req.flag = 1
        req.u = verifyData.u
        req.id = verifyData.id
        next()
    } else console.log('我是checkAuthMiddle,出错了,239');
}
route.post('/getGoods', async (req, res) => {
    let data = await getGoods(999)
    data.forEach(v => { v.des = v.des.replace(',', '，') });
    res.send(data)
})
route.post('/searchGoods', async (req, res) => {
    let data = await searchGoods(req.query.kw)
    res.send(data)
})
route.post('/login', async (req, res) => {
    let u = req.body.username
    let p = req.body.password
    console.log(u, p)
    let data = await getUsers(999)
    let token = 0
    let message = { message: '账号或者密码错误', state: 500, token }
    for (let i = 0; i < data.length; i++) {  //foreach 错误
        if (data[i].username == u && data[i].password == p) {
            let userData = await getUserInfo(0, u)
            let id = userData.id
            let name = userData.name
            let username = userData.username
            let love = userData.love
            token = getToken({ u, id }, '1h')
            message = { id, message: '登录成功', state: 200, ...JSON.parse(userData.extra), token, name, username, love }
            break;
        }
    }
    res.send(message)
})
route.post('/register', async (req, res) => {
    let u = req.body.username
    let p = req.body.password
    let data = await getUsers(9999)
    let token = flag = 0
    let message = { message: '账号已经存在,请更换', state: 500, token }
    for (let i = 0; i < data.length; i++)
        if (data[i].username == u) {
            flag = 1
            break;
        }
    if (!flag) {
        insertUser(u, p)
        let userData = await getUserInfo(0, u)
        let id = userData.id
        let name = userData.name
        let love = userData.love
        let username = userData.username
        token = getToken({ u, id }, '1h')
        message = { id, message: '注册成功', state: 200, token, ...JSON.parse(userData.extra), name, username, love }
    }
    res.send(message)
})

route.post('/addLoveNum', async (req, res) => {
    let gid = req.body.id
    setTableExtra('goods', gid, 'love', 0, { mode: 'add' })
    res.send({ state: 200 })
})
route.post('/buyGoods', checkAuthMiddle, async (req, res) => {
    let Uid = req.id
    let Gid = req.query.Gid
    let mode = req.query.mode  //loveRemove
    let goodsPrice = await getTableData('goods', Gid, 'price')
    let { state, price } = await editPrice(Uid, goodsPrice, { mode: 'remove' })
    // setTableExtra('users', Uid, 'finishOrderNum', 0, { mode: 'add' })
    buyGoods(Uid, Gid)
    if (mode == 'loveRemove') {
        delLove(Uid, Gid)
        setTableExtra('users', Uid, 'loveOrderNum', 0, { mode: 'remove' })
    }
    res.send({ state, price })
})
route.post('/loveGoods', checkAuthMiddle, async (req, res) => {
    let uid = req.id
    let gid = req.query.Gid
    let flag = await getDetailLove(uid, gid)
    if (flag) return
    let state = await loveGoods(uid, gid)
    let des = await getTableData('goods', gid, 'des')
    let price = await getTableData('goods', gid, 'price')
    setTableExtra('users', uid, 'loveOrderNum', 0, { mode: 'add' })
    insertLove(uid, gid, des, price)
    res.send({ state })
})
route.post('/getUserOrder', checkAuthMiddle, async (req, res) => {
    let uid = req.id
    let data = await getUserOrder(uid)
    console.log(data)
    res.send(data)
})
route.post('/getUserLove', checkAuthMiddle, async (req, res) => {
    let id = req.id
    let data = await getUserLove(id)
    res.send(data)
})
route.post('/setUserInfo', checkAuthMiddle, async (req, res) => {
    let state = await setUserInfo(req.id, req.body.name, req.body.username, req.body.oldPassword, req.body.newPassword)
    res.send({ state })
})
route.post('/setUserAddress', checkAuthMiddle, (req, res) => {
    setTableExtra('users', req.id, 'address', req.query.address)
    res.send({ state: 200 })
})
route.post('/delLove', checkAuthMiddle, (req, res) => {
    delLove(req.id, req.query.gid)
    res.send({ state: 200 })
})
route.post('/sendGood', checkAuthMiddle, upload, (req, res) => {
    let uid = req.id
    let files = req.files
    let { goodDes, goodSort, goodTag, goodPrice } = JSON.parse(req.body.goodsInfo)
    let type = req.files[0].mimetype
    let name = req.files[0].filename
    let dir = './src/assets/images/'
    if (!new RegExp(/^image\//).test(type)) return
    let newName = randomStr() + '.' + type.split('/')[1]
    let imageFiled = JSON.stringify([{ name: newName }])
    let extraFiled = JSON.stringify({ state: 1, love: 0 })
    fs.renameSync(dir + name, dir + newName)
    insertGoods(uid, goodTag, goodDes, goodSort, imageFiled, goodPrice, extraFiled)
    res.send({ state: 200 })
})
route.post('/getUserGoods', checkAuthMiddle, async (req, res) => {
    let uid = req.id
    let data = await getUserGoods(uid)
    res.send({ data })
})
route.post('/delGoods', checkAuthMiddle, async (req, res) => {
    let uid = req.id
    let gid = req.body.id
    let dir = './src/assets/images/'
    let originGoodsData = await getGoodsId(gid)
    let imgName = JSON.parse(originGoodsData[0].image)[0].name
    fs.unlinkSync(dir + imgName)
    delGoods(gid)
    res.send({ state: 200 })
})
module.exports = route
