// pages/mode/mode.js
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
// var ACTION_CARD = require('../../action/a_card.js');
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

        feedback:[
            {
                content: '你可以留下联系方式，文本，图片，进行方式，文本，图片，进行反馈',
                content_type: 0,
                contract_info: '',//弹出框input值
                myDate: '2018-01-05 12:45',
                role: false,
                img: '../../images/hotapp_01_03.png',
            }, {
                content: '../../images/hotapp_01_03.png',
                content_type:1,
                contract_info: '',
                myDate: '',
                role: true,
                img: "../../images/hotapp_01_07.png"
            },
            {
                content: '【系统消息】：您的反馈已',
                content_type: 0,
                contract_info: '',
                myDate: '',
                role: true,
                img: "../../images/hotapp_01_07.png"
            },
            {
                content: '【系统消息】：您的反馈已',
                content_type: 0,
                contract_info: '',
                myDate: '',
                role: true,
                img: "../../images/hotapp_01_07.png"
            },
            {
                content: '【系统消息】：您的反馈已',
                content_type: 0,
                contract_info: '',
                myDate: '',
                role: true,
                img: "../../images/hotapp_01_07.png"
            },
            {
                content: '【系统消息】：您的反馈已',
                content_type: 0,
                contract_info: '',
                myDate: '',
                role: true,
                img: "../../images/hotapp_01_07.png"
            },
        ],
    },

    // 发送聊天信息
    send(e){
        console.log(e.detail)
        var value = e.detail
        var talk = {
            content: value,
            content_type: 0,
            contract_info: '',
            myDate: '',
            role: true,
            img: "../../images/hotapp_01_07.png"
        }
        var list = GP.data.feedback
        list.push(talk)
        GP.setData({
            feedback: list
        })
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


    onLoad(){
        GP = this
        // this.LivePlayerContext 
        // console.log(a)    
        
        var _userName ="bushitan4"
        var _secret = "123"
 
    },
    // onReady() {
    //     live = wx.createLivePlayerContext("live1", this)
    //     console.log(live)
    // },
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