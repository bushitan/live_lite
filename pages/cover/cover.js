// pages/cover/cover.js
var GP

var JMessage = require('../../utils/jmessage-wxapplet-sdk-1.4.0.min.js')
var MD5 = require('../../utils/md5.js')
var RANDOM = require('../../utils/random.js')

var jim = new JMessage({
    // debug : true
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
      tabList: [
          { 'tag_name': "吃播", "tag_id": 1 },
          { 'tag_name': "小仁专栏", "tag_id": 2 },
      ],
      coverList:[
          {
              "cover_url": "",
              "title": "专栏一",
              "issue_time":"2018-2-18",
          },
      ],
      coverList1: [
          {
              "cover_url": "",
              "title": "专栏一",
              "issue_time": "2018-2-18",
          },
      ],
      coverList2: [
          {
              "cover_url": "",
              "title": "专栏二",
              "issue_time": "2018-2-11",
          },
      ],
    },

    // 点击tab
    clickTag(e) {
        var _tag_id = e.detail.tag_id
        console.log(_tag_id)
        if (_tag_id == 1)   
            GP.setData({ coverList: GP.data.coverList1  })
        else
            GP.setData({ coverList: GP.data.coverList2 })
    },  

    //点击文章
    clickCover(e) { },

    onLoad(){
        GP = this
        return
        var appKey = "12101be04a3f9c65a1cd24b3"
        var Key = "f803e0a4a08c48a31456b4ed"
        var timestamp = new Date().getTime()
        var _random = RANDOM.Get32()

        var signature = MD5.hex_md5("appkey=" + appKey + "&timestamp=" + timestamp + "&random_str=" + _random+"&key=" + Key+"")
        console.log(signature)
        jim.init({
            "appkey": appKey,
            "random_str": _random,
            "signature": signature,
            "timestamp": timestamp
        }).onSuccess(function (data) {
            console.log(data)
            GP.register()

            jim.isInit()
            jim.isConnect()
        }).onFail(function (data) {
            //TODO
        });  
    },

    register(){
        jim.register({
            'username': 'bushitan',
            'password': 'w3214560',
            'extras': { 'key1': 'val1', 'key2': 'val2' },
            'address': '深圳'
        }).onSuccess(function (data) {
            console.log(data)
            //data.code 返回码
            //data.message 描述
            GP.login()
        }).onFail(function (data) {
            // 同上
            console.log(data)
            GP.login()
        });
    },

    login(){
        jim.login({
            'username': 'bushitan',
            'password': 'w3214560'
        }).onSuccess(function (data) {
            console.log(data)
            GP.inChatRoom()

            // 监听信息
            console.log("信息监听",data)
            jim.onMsgReceive(function (data) {
                console.log("监听",data)
            });
             //data.code 返回码
            //data.message 描述
            //data.online_list[] 在线设备列表
            //data.online_list[].platform  Android,ios,pc,web
            //data.online_list[].mtime 最近一次登录时间
            //data.online_list[].isOnline 是否在线 true or false
            //data.online_list[].isLogin 是否登录 true or false
            //data.online_list[].flag 该设备是否被当前登录设备踢出 true or false
        }).onFail(function (data) {
            // 同上
            console.log(data)
        });
    },

    inChatRoom() {
        console.log("inChatRoom")
        jim.enterChatroom({
            'id': '12510285'
        }).onSuccess(function (data) {
            console.log("进入成功", data)
            jim.onRoomMsg(function (data) {
                console.log("聊天室监听", data)
                // data.room_id 聊天室 id
                // data.msg_id 消息 id
                // data.ctime_ms 消息生成时间
                // data.content
            });
            //data.code 返回码
            //data.message 描述
            //data.id 聊天室 id
            }).onFail(function (data) {
                console.log("进入失败", data)
            
            //data.code 返回码
            //data.message 描述
        });
    },

    sendMsg(){
        jim.sendChatroomMsg({
            'target_rid': '12510285',
            'content': 'disaidhsoadfih fhdj  djgbfkdghkj'
        }).onSuccess(function (data,msg) {
            console.log(data)
            //data.code 返回码
            //data.message 描述
            //data.room_id 目标聊天室 id
            //data.msg_id 发送成功后的消息 id
            //data.ctime_ms 消息生成时间,毫秒
        }).onFail(function (data) {
            //data.code 返回码
            //data.message 描述
        });
    },

})