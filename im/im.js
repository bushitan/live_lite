

var JMessage = require('jmessage-wxapplet-sdk-1.4.0.min.js')
var RANDOM = require('random.js')
var MD5 = require('md5.js')
var appKey = "12101be04a3f9c65a1cd24b3"
var Key = "f803e0a4a08c48a31456b4ed"
var timestamp = new Date().getTime()
var _random = RANDOM.Get32()

module.exports = {
    Jim: Jim,
}

/**
 * arg:
 *_GP : 全局变量，
 * username:用户名字
 * password: 密码
 * loginSuccessFun：登陆成功函数
 * loginFailFun: 登陆失败函数
 */
function Jim(_GP, username, password, loginSuccessFun, loginFailFun){
    var that = this
    this.GP = _GP
    this.username = username
    this.password = password
    this.loginSuccessFun = loginSuccessFun
    this.loginFailFun = loginFailFun
    this.jim = new JMessage({
        // debug : true
    })
    var signature = MD5.hex_md5("appkey=" + appKey + "&timestamp=" + timestamp + "&random_str=" + _random + "&key=" + Key + "")
    console.log(signature)

    //初始化
    this.jim.init({
        "appkey": appKey,
        "random_str": _random,
        "signature": signature,
        "timestamp": timestamp
    }).onSuccess(function (data) {
        console.log(data)
        that.register()
    }).onFail(function (data) {
            console.log(data)
        //TODO
    });  

    //用户注册
    this.register = function(){
        this.jim.register({
            'username': this.username,
            'password': this.password,
        }).onSuccess(function (data) {
            // console.log(data)
            that.login()
            }).onFail(function (data) {
                console.log('注册失败', data)
            if (data.code == 882002){
                that.login()
                console.log('已经登陆', data)
            }
        });
    }

    //用户登录
    this.login = function(){
        this.jim.login({
            'username': this.username,
            'password': this.password,
        }).onSuccess(function (data) {
            that.loginSuccessFun(data)
        }).onFail(function (data) {
            if (tha.loginFailFun != undefined)
                that.loginFailFun(data)
        });
    }

    //返回钩子
    return this.jim
}