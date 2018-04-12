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
    isTeacher: true,//是否推流权限
    
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

    // feedback: LIB.feedback ,
    messageList:[], //IM信息
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
      GP.getPPT() //获取PPT信息
      GP.setData({
        userInfo : wx.getStorageSync(KEY.USER_INFO)
      })
      Script.init(GP)
  },

  getPPT(){
    API.Request({
      url: API.LITE_USER_GET_PPT,
      success: function (res) {
        console.log(res)
        GP.setData({
          pptList: res.data.ppt_list,
          // pptTagList: res.data.ppt_list,
        })
      }
    })
  },


    //获取当前房间参数
    getCurrentRoom(){
        API.Request({
        url: API.ROOM_GET,
        success:function(res){
            console.log(res.data)
            GP.setData({
                imRoomID: res.data.app_dict.im_num,
                appDict: res.data.app_dict,
                
                room: res.data.room_dict,
                messageList: res.data.message_list,
                isTeacher: res.data.is_teacher,
            })
            GP.jmInit() //IM登陆  
        },
        })
    },


  //点击发送按钮事件
  sendMsg(e) {
    console.log(e)
    //给自己发送信息
    Script.listenMessage(
      GP.data.userInfo.nick_name,
      GP.data.userInfo.avatar_url,
      GP.data.isTeacher,
      KEY.MESSAGE_TEXT,
      e.detail,
    )
    //像群里发送信息
    GP.sendRoomMsg(e.detail)


    //TODO 像后台发送信息记录
    API.Request({
      url: API.ROOM_ADD_MESSAGE,
      data: {
        "room_id": GP.data.room.room_id,
        "style": KEY.MESSAGE_TEXT,
        "is_teacher": GP.data.isTeacher? KEY.YES : KEY.NO,
        "content": e.detail,
      },
      success: function (res) {
        console.log("存储消息成功")
      },
    })
  },



    //IM初始化
    jmInit(){
        var appID = GP.data.appDict.id
        var user_info = wx.getStorageSync(KEY.USER_INFO)
        var userName = "live_app_" + appID + "_user_" + user_info.user_id
        console.log(userName)
        // var userName = "live_app_3"
        var passWord = "123"
        JMessage.init(APP, userName, passWord, GP.listen);
        
    },
  
  //监听事件
  listen(){

    //监听单聊信息
    JMessage.JIM.onMsgReceive(function (data) {
      var msg = data;
      var body = data.messages[0].content.msg_body;
      data = JSON.stringify(data);
      console.log('msg_receive:' + data);
      console.log(GP.data)
    });

    // 进入聊天室
    JMessage.JIM.enterChatroom({
      'id': GP.data.imRoomID
    }).onSuccess(function (data) {
      console.log("进入成功", data)
    }).onFail(function (data) {
      console.log("进入失败", data)
    });

    // var MSG_TYPE_PPT = "xx_ppt"
    // var MSG_TYPE_DRAW = "xx_draw"
    // var MSG_TYPE_CLEAR = "xx_clear"
    // !! 聊天室信息监控
    JMessage.JIM.onRoomMsg(function (data) {
        if (data.content.msg_body.text == MSG_TYPE_DRAW) {
        GP.setData({
          drawLine: data.content.msg_body.extras
        })
      }
        else if (data.content.msg_body.text == MSG_TYPE_CLEAR) {
        GP.setData({
          drawLine: data.content.msg_body.extras
        })
      }
        //学员接受到PPT信息，1、切换电子白板的tag，2、设置图片src
        else if (data.content.msg_body.text == MSG_TYPE_PPT) {
            Script.ChangePusher(1)
            GP.setData({
                tagIndex: 1,
                bgImageUrl: data.content.msg_body.extras.url,
            })
      } 
      else 
        Script.listenMessage(
          data.content.msg_body.text,
          data.content.msg_body.extras.nickname,
          data.content.msg_body.extras.avatar_url, 
          data.content.msg_body.extras.is_teacher, 
        )

      // console.log("聊天室监听", data)
      // console.log(GP.data)
    });
  },

  sendRoomMsg( content, extras={}){
   
    extras['nickname'] = GP.data.userInfo.nick_name
    extras['gender'] = GP.data.userInfo.gender
    extras['avatar_url'] = GP.data.userInfo.avatar_url
    extras['is_teacher'] = GP.data.isTeacher
      

    JMessage.JIM.sendChatroomMsg({  //发送至群聊
        'target_rid': GP.data.imRoomID,
        'content': content,
        'content': content,
        'extras': extras
    }).onSuccess(function (data, msg) {
      console.log(data)
    }).onFail(function (data) {
      console.log(data)
    });
  },

  //绘画完成
  sendDraw(e) {
    GP.sendRoomMsg( MSG_TYPE_DRAW,e.detail)
  },
  //点击清除画布按钮
  sendClear(e) {
    GP.sendRoomMsg(MSG_TYPE_CLEAR, e.detail)
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
    GP.sendRoomMsg( MSG_TYPE_PPT, { url: imageUrl })
    // mode.painter()
    GP.setData({ tagIndex: 1 })
    Script.ChangePusher(1)
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
