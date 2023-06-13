const mysql = require('mysql')
const dbConfig = {
   host:"127.0.0.1",
   // host:"sql.freedb.tech",
    database:"yumao",
   //  database:"freedb_yumao-u",
    username:'root',
   //  username:'freedb_yumao',
    password:'',
   //  password:'5qVm47*vPgsbB@@',
}
const db = mysql.createConnection({
   host: dbConfig.host,
   user: dbConfig.username,
   password: dbConfig.password,
   database: dbConfig.database,
})
db.query('select 1', (err, result) => {
   if (err) console.log('数据库连接失败,请检查数据库配置')
   else console.log('数据库连接成功!')
})
module.exports = {db}