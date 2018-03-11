//app.js
// var IM = require('im/im.js')
var GP
App({
    onLaunch: function () {
        GP = this
        // var _userName = "bushitan4"
        // var _secret = "123"
        // GP.globalData.jim = new IM.Jim(this, _userName, _secret, GP.imSuccess)
    },
    
    // imSuccess(data) {
    //     GP.globalData.jimIsLogin = true
    //     // 绑定监听
    //     GP.globalData.jim.onMsgReceive(function (data) {
    //         console.log("一般监听", data)
    //     });

    //     GP.globalData.jim.onRoomMsg(function (data) {
    //         console.log("聊天室监听", data)
    //     });

    //     // 进入聊天室
    //     GP.globalData.jim.enterChatroom({
    //         'id': GP.globalData.jimRoomID
    //     }).onSuccess(function (data) {
    //         console.log("进入成功", data)
    //     }).onFail(function (data) {
    //         console.log("进入失败", data)
    //     });
    // },
    
    globalData: {
        userInfo: null,
        jim: null,
        jimRoomID: '12510285' ,
        jimIsLogin:false,
    }
})


// "tabBar": {
//     "list": [{
//         "pagePath": "pages/live/live",
//         "text": "直播"
//     }, {
//         "pagePath": "pages/cover/cover",
//         "text": "专栏"
//     }
//     ]
// },