// pages/mode/mode.js
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
var ACTION_CARD = require('../../action/a_card.js');
var JMessage = require('../../utils/jmessage-wxapplet-sdk-1.4.0.min.js')
var MD5 = require('../../utils/md5.js')
var RANDOM = require('../../utils/random.js')
var IM = require('../../im/im.js')

var jim 
// var jim = new JMessage({
//     // debug : true
// });

var actionCard
var GP
var live
//静态变量
// var CARD_LIST = KEY.CARD_LIST

Page({

    /**
     * 页面的初始数据
     */
    data: {
        orientation:"vertical",
    },

    statechange(e) {
        console.log('live-pusher code:', e.detail.code)
    },
    statechangePlayer(e) {
        console.log('live-player code:', e.detail.code)
    },
    error(e) {
        console.error('live-player error:', e.detail.errMsg)
    },
    
    toPusher(){
        wx.navigateTo({
            url: '/pages/pusher/pusher',
        })
    },

    onShareAppMessage(){},

    switch2Change(e){        
        if (e.detail.value)
            GP.setData({ orientation:"horizontal"})
        else
            GP.setData({ orientation: "vertical" })
    },

    liveFullScreen(){
        console.log("进入全屏")
        live.requestFullScreen({
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            },
        })
    },
    exitFullScreen(){
        console.log("退出全屏")
        live.exitFullScreen({
            success: function (res) {
                console.log(res)
            },
            fail: function (res) {
                console.log(res)
            },
        })
    },
    onLoad(){
        GP = this
        // this.LivePlayerContext 
        live = wx.createLivePlayerContext("live1",this)
        console.log(a)    
        
        var _userName ="bushitan4"
        var _secret = "123"
 
    },
    // imInput(e){
    //     GP.setData({
    //         inputValue:e.detail.value
    //     }) 
    // },

    // sendMsg(){
    //     if (APP.globalData.jimIsLogin){
    //         APP.globalData.jim.sendChatroomMsg({
    //             'target_rid': APP.globalData.jimRoomID,
    //             'content': GP.data.inputValue
    //         }).onSuccess(function (data, msg) {
    //             console.log(data)
    //         }).onFail(function (data) {
    //         });
    //     }
          
    // },

})