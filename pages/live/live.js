// pages/mode/mode.js
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
var LIB = require('lib.js');
var Script = require('script.js');
var IM = require('../../utils/im/im.js')

var JMessage = require('../../utils/im/jm.js')


// var jim 
var GP
var message
var MSG_TYPE_PPT = "xx_ppt"
var MSG_TYPE_DRAW = "xx_draw"
var MSG_TYPE_CLEAR = "xx_clear"

// console.log(LIB.room)
Page({
  data: {
    imRoomID: 12500045, //房间编号
    //房间的类型
    ROOM_PREPARE : 0,
    ROOM_PLAYER : 1,
    ROOM_LIVE : 2,
    orientation: "vertical",
    isBegin: false,
    room: LIB.room,
    isPusher: false,//是否推流权限
    
    pusherTab: ["推流", "电子白板", "PPT", "参数设置", "直播校验"],
    show:{
      Pusher: true,
      IM: true,
      Player: false,
      PusherMenu: false,
      Cover: false,
      Painter: false,
      Gallery:false,
    },
    feedback: LIB.feedback ,

    playerTab: ["群聊", "电子白板"],
    showPlayerIM: true,
    showPlayerPainter: false,

    tagIndex:0,
    bgImageUrl:"",//背景图片
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
      // var mode = new LIB.Mode(GP)
      // mode.ChangePusher(index)
      Script.ChangePusher(index)
  },





  onLoad(){
      GP = this
      GP.getCurrentRoom()
      Script.init(GP)
  },
  //获取当前房间参数
  getCurrentRoom(){
    API.Request({
        url: API.ROOM_GET,
        success:function(res){
            console.log(res.data)
            GP.setData({
              imRoomID: res.data.dict_room.im_num,
              room: res.data.dict_room,
              isPusher: res.data.is_pusher_user,
            })
            GP.jmInit() //IM登陆  
        },
    })
  },
  //IM初始化
  jmInit(){
    var user_info = wx.getStorageSync(KEY.USER_INFO)
    var userName = "live_app_" + user_info.user_id
    console.log(userName)
    // var userName = "live_app_3"
    var passWord = "123"
    JMessage.init(APP, userName, passWord, GP.listen);
    
  },
  
  //监听事件
  listen(){
    console.log("list")
    JMessage.JIM.onMsgReceive(function (data) {
      var msg = data;
      var body = data.messages[0].content.msg_body;
      data = JSON.stringify(data);
      console.log('msg_receive:' + data);
      console.log(GP.data)
    });

    // 进入聊天室
    JMessage.JIM.enterChatroom({
      'id': 12500045
    }).onSuccess(function (data) {
      console.log("进入成功", data)
    }).onFail(function (data) {
      console.log("进入失败", data)
    });
    JMessage.JIM.onRoomMsg(function (data) {
      console.log("聊天室监听", data)
      console.log(GP.data)
    });
  },

  sendRoomMsg(room_id, content, extras={}){
    JMessage.JIM.sendChatroomMsg({  //发送至群聊
      'target_rid': room_id,
      // 'target_rid': APP.globalData.jimimRoomID,
      'content': content,
      'content': content,
      'extras': extras
    }).onSuccess(function (data, msg) {
      console.log(data)
    }).onFail(function (data) {
      console.log(data)
    });
  },

  sendMsg(e) {
    console.log(e)

    Script.sendSelf(e) //更新自己的UI
    GP.sendRoomMsg(GP.data.imRoomID, e.detail)
    

  },

  //绘画完成
  sendDraw(e) {
    GP.sendRoomMsg(GP.data.imRoomID, MSG_TYPE_DRAW,e.detail)
  },
  //点击清除画布按钮
  sendClear(e) {
    GP.sendRoomMsg(GP.data.imRoomID, MSG_TYPE_CLEAR, e.detail)
    // var clearObj = e.detail
    // message.sendClear(clearObj)
  },

  //发送PPT
  sendPPT(e) {
    var imageUrl = e.detail
    GP.setData({
      bgImageUrl: imageUrl
    })
    // ppt菜单 切换到 电子白板
    var mode = new LIB.Mode(GP)
    // message.sendPPT({ url: imageUrl })
    GP.sendRoomMsg(GP.data.imRoomID, MSG_TYPE_PPT, { url: imageUrl })
    mode.painter()
    GP.setData({ tagIndex: 1 })
    // 提示成功
    wx.showToast({
      title: '设置ppt成功',
    })

  },


  onShareAppMessage() { },
})







    // return
    // JMessage.JIM.sendSingleMsg({
    //   'target_username': 'bushitan',
    //   'content': e.detail
    // });



  // onReady() {
  //     GP.onInit()
  //     APP.checkMember()
  //     message = new LIB.Message(GP)
  // },

  // sendMsg(e) {
  //     message.sendSelf(e)
  //     message.sendOther(e)
  // },

  // onInit(){
  //     API.Request({
  //         url: API.ROOM_GET,
  //         success:function(res){
  //             console.log(res.data)
  //             GP.setData({
  //                 room: res.data.dict_room,
  //                 isPusher: res.data.is_pusher_user,
  //             })
  //             GP.imInit() //IM登陆  
  //         },
  //     })
  // },

  // //IM 初始化
  // imInit(){
  //   message.reLogin()
  //     // console.log(wx.getStorageSync(KEY.USER_INFO))
  //     // var user_info = wx.getStorageSync(KEY.USER_INFO)
  //     // var userName = "live_app_" + user_info.user_id 
  //     // var passWord = "123"
  //     // APP.globalData.jim = new IM.Jim(GP, userName, passWord, message.success)
  // },
