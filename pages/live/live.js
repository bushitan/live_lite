// pages/mode/mode.js
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
// var ACTION_CARD = require('../../action/a_card.js');
// var JMessage = require('../../utils/jmessage-wxapplet-sdk-1.4.0.min.js')
// var MD5 = require('../../utils/md5.js')
// var RANDOM = require('../../utils/random.js')
var IM = require('../../im/im.js')

var jim 
// var jim = new JMessage({
//     // debug : true
// });
var GP
//静态变量
// var CARD_LIST = KEY.CARD_LIST

Page({

    /**
     * 页面的初始数据
     */
    data: {

        //房间的类型
        ROOM_PREPARE : 0,
        ROOM_PLAYER : 1,
        ROOM_LIVE : 2,

        orientation: "vertical",
        // isBegin: true,
        isBegin: false,
        room:{
            content_url: "https://img.qlchat.com/qlLive/followQRCode/topic-intro/4FO7HW8D-YOAB-98PQ-1520402709185-GSKH2RKY7UR2.jpg?x-oss-process=image/resize,w_800,limit_1",
            cover_url: "https://img.qlchat.com/qlLive/topicBackground/WXKEEQQT-AVDQ-LQE3-1520390119263-DUXDSUFVXX96.jpg?x-oss-process=image/resize,m_fill,limit_0,h_500,w_800",
            create_time: "2018-03-10",
            description: "时间：2018-03-08 19:30:00",
            im_num: "12510285",
            player_url: "rtmp://live.12xiong.top/AppName/StreamName",
            pusher_url: "rtmp://video-center.alivecdn.com/AppName/StreamName?vhost=live.12xiong.top",
            room_id: 1,
            serial: 0,
            style: 1,
        },//直播房间
        isPusher:true,//是否推流权限

        showPlayer: true,
        showPusher: false,
        showPusherMenu: false,
        showIM: true,
        showCover: false,
        

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
    // pusher 设置模式
    changeMode(){
        wx.showActionSheet({
            itemList: ["推流", "推流参数设置", "直播", "视频校验", "封面",],
            success: function (res) {
                console.log(res.tapIndex)
                switch (res.tapIndex) {
                    case 0: pusher(); break;
                    case 1: pusherSet(); break;
                    case 2: player(); break;
                    case 3: check(); break;
                    case 4: cover(); break;
                }
            },
        })
        function pusher() {
            GP.setData({
                showPlayer: false,
                showPusher: true,
                showPusherMenu: false,
                showIM: true,
                showCover: false,
            })
        }
        function pusherSet() {
            GP.setData({
                showPlayer: false,
                showPusher: true,
                showPusherMenu: true,
                showIM: false,
                showCover: false,
            })
        }
        function player() {
            GP.setData({
                showPlayer: true,
                showPusher: false,
                showPusherMenu: false,
                showIM: true,
                showCover: false,
            })
        }
        function check() {
            GP.setData({
                showPlayer: true,
                showPusher: true,
                showPusherMenu: false,
                showIM: false,
                showCover: false,
            })
        }
        function cover(){
            GP.setData({
                showPlayer: false,
                showPusher: false,
                showPusherMenu: false,
                showIM: false,
                showCover: true,
            })
        }
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
        
        // var _userName ="bushitan4"
        // var _secret = "123"
 
        // GP.onInit()
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
                // GP.imInit() //IM登陆
                
            },
        })

    },
    imInit(){
        console.log(wx.getStorageSync(KEY.USER_INFO))
        var user_info = wx.getStorageSync(KEY.USER_INFO)
        var userName = "live_app_" + user_info.user_id 
        var passWord = "123"
        // var userName = "bushitan5"
        // // var passWord = "123"
        APP.globalData.jim = new IM.Jim(GP, userName, passWord, GP.imSuccess)
    },
    imSuccess(data) {
        console.log('2success')
        APP.globalData.jimIsLogin = true
        // 绑定监听
        APP.globalData.jim.onMsgReceive(function (data) {
            console.log("一般监听", data)
        });

        APP.globalData.jim.onRoomMsg(function (data) {
            console.log("聊天室监听", data)

            var msg = 
            {
                content: data.content.msg_body.text,
                content_type: 0,
                contract_info: '',//弹出框input值
                myDate: '2018-01-05 12:45',
                role: false,
                img: '../../images/hotapp_01_03.png',
            }
            var feedback = GP.data.feedback
            feedback.push(msg)
            GP.setData({
                feedback: feedback
            })
            
        });

        // 进入聊天室
        APP.globalData.jim.enterChatroom({
            'id': APP.globalData.jimRoomID
        }).onSuccess(function (data) {
            console.log("进入成功", data)
        }).onFail(function (data) {
            console.log("进入失败", data)
        });
    },

    prepare(){
        wx.showModal({
            title: '预约成功',
            content: '请按时观看直播',
            showCancel:false,
        })
    },

    onReady() {
        GP.onInit()
        console.log("1ready")
        // live = wx.createLivePlayerContext("live1", this)
        // console.log(live)
    },
    // imInput(e){
    //     GP.setData({
    //         inputValue:e.detail.value
    //     }) 
    // },

    sendMsg(e){
        // console.log(e.detail)
        GP.send(e)
        if (APP.globalData.jimIsLogin){
            APP.globalData.jim.sendChatroomMsg({
                'target_rid': APP.globalData.jimRoomID,
                'content': e.detail
            }).onSuccess(function (data, msg) {
                // console.log(data)
            }).onFail(function (data) {
            });
        }
          
    },

})