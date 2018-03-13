// pages/mode/mode.js
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
var LIB = require('lib.js');
var IM = require('../../im/im.js')

var jim 
var GP
var message 

// console.log(LIB.room)
Page({
    data: {
        //房间的类型
        ROOM_PREPARE : 0,
        ROOM_PLAYER : 1,
        ROOM_LIVE : 2,
        orientation: "vertical",
        isBegin: false,
        room: LIB.room,
        isPusher: true,//是否推流权限
        
        pusherTab: ["推流", "电子白板", "参数设置", "直播校验"],
        showPusher: true,
        showIM: true,
        showPlayer: false,
        showPusherMenu: false,
        showCover: false,
        showPainter: false,
        feedback: LIB.feedback ,

        playerTab: ["群聊", "电子白板"],
        showPlayerIM: true,
        showPlayerPainter: false,
    },
    // 点击播放标签
    clickPlayerTab(e) {
        var index = e.detail

        var mode = new LIB.Mode(GP)
        mode.ChangePlayer(index)

    },
    // 点击推流标签
    clickPusherTab(e) {
        var index = e.detail
        var mode = new LIB.Mode(GP)
        mode.ChangePusher(index)
    },

    //设置按钮——改变模式
    // changeMode() {
    // },

    //绘画完成
    paintComplete(e){
        var drawLine = e.detail
        drawLine.width = 12
        GP.setData({
            drawLine: drawLine
        })
    },
    //点击清除画布按钮
    paintClear(e) {
        var drawLine = e.detail
        GP.setData({
            drawLine: e.detail
        })

    },

    onLoad(){
        GP = this
    },
    onReady() {
        GP.onInit()
        APP.checkMember()
        message = new LIB.Message(GP)
    },

    sendMsg(e) {
        // console.log(e.detail)
        message.sendSelf(e)
        message.sendOther(e)
    },

    onInit(){
        API.Request({
            url: API.ROOM_GET,
            success:function(res){
                console.log(res.data)
                GP.setData({
                    room: res.data.dict_room,
                    isPusher: res.data.is_pusher_user,
                })
                GP.imInit() //IM登陆
                
            },
        })
    },

    //IM 初始化
    imInit(){
        console.log(wx.getStorageSync(KEY.USER_INFO))
        var user_info = wx.getStorageSync(KEY.USER_INFO)
        var userName = "live_app_" + user_info.user_id 
        var passWord = "123"
        APP.globalData.jim = new IM.Jim(GP, userName, passWord, message.success)
    },

    onShareAppMessage() { },
})



    // // 发送聊天信息
    // send(e) {
    //     console.log(e.detail)
    //     var value = e.detail
    //     var talk = {
    //         content: value,
    //         content_type: 0,
    //         contract_info: '',
    //         myDate: '',
    //         role: true,
    //         img: "../../images/hotapp_01_07.png"
    //     }
    //     var list = GP.data.feedback
    //     list.push(talk)
    //     GP.setData({
    //         feedback: list
    //     })
    // },