//app.js
// var IM = require('im/im.js')
var JMessage = require('utils/im/jm.js')
var API = require('utils/api.js');
var GP
App({
    onLaunch: function () {
        GP = this
    },
    onLoad(){
        GP.onInit()
    },
    checkMember(callback) {
        console.log(2138291)
        API.Request({
            url: API.ORDER_CHECK_MEMBER,
            success: function (res) {
                console.log(res.data)
                if (callback!= undefined)
                  callback(res)
            }
        })
    },
  
    globalData: {
        userInfo: null,
        baseAccount:"live_hx_user_",
        passWord:"123",
        jim: null,
        jimRoomID: '12510285' ,
        jimIsLogin:false,
    },



    // 初始化IM
    initIM(teacherName, passWord) {
        // tempPage = _GP
        JMessage.init("", teacherName, passWord, GP.IMSuccess);
        this.globalData.JMessage = JMessage
        

    },

    // IM登陆成功
    IMSuccess() {
        this.globalData.currentPage.IMSuccess() //登陆成功事件
    },

            // Script.listenMessage(
            //     data.content.msg_body.text,
            //     data.content.msg_body.extras.nickname,
            //     data.content.msg_body.extras.avatar_url,
            //     data.content.msg_body.extras.is_teacher,
            // )
    onRoomMessage(data){
        
        var list = GP.data.messageList
        ++msg_id
        var id = "a" + msg_id
        list.push({
            id: id,
            nick_name: nick_name,
            avatar_url: avatar_url,
            is_teacher: is_teacher,
            style: style,
            content: content,
            audio_url: audio_url,
            image_url: image_url,
        }, )
        GP.setData({
            messageList: list,
        })
    },


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

// "tabBar": {
//     "list": [{
//         "pagePath": "pages/index/index",
//         "text": "直播"
//     }, {
//         "pagePath": "pages/cover/cover",
//         "text": "专栏"
//     }, {
//         "pagePath": "pages/my/my",
//         "text": "报名"
//     }
//     ]
// }