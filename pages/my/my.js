
var GP
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');


Page({
    data: {
        userInfo:{},
        lock:false,
        isSign:false,
        planList: [{
            title: "音乐课",
            summary: "音乐欣赏、表演",
            des: "钢琴教室",
            start_time: '9:00',
            end_time: "10:00",
        }, {
            title: "美术课",
            summary: "水彩画创意",
            des: "手工教室",
            start_time: '10:10',
            end_time: "11:00",
        },
        ]
    },
    toPusher() {
        wx.navigateTo({
            url: '/pages/pusher/pusher',
        })
    },
    
    sign(){
        var userInfo = GP.data.userInfo
        if (userInfo.name == "" || userInfo.name == undefined || userInfo.phone == "" || userInfo.phone == undefined) {

            wx.showModal({
                title: '温馨提示',
                content: '为了方便我们的客服联系您，请填写完整信息',
            })
            return
        }
        wx.setStorageSync(KEY.IS_SIGN, true)
        wx.showModal({
            title: '报名成功',
            content: '请预览我们近期的课程表，',
        })
        GP.setData({
            isSign:true
        })
    },
    reSign(){
        GP.setData({
            isSign: false
        })
    },

    onLoad: function (options) {
        GP = this

        GP.setData({ isSign: wx.getStorageSync(KEY.IS_SIGN) == true ? true :false})
        GP.onInit()
    },

    inputName(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.name = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },
    inputCompany(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.company = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },
    inputPhone(e) {
        var _userInfo = GP.data.userInfo
        _userInfo.phone = e.detail
        GP.setData({
            userInfo: _userInfo
        })
    },


    /**
     *  进入渠道：
     * 1 、 文章进入，有点播
     * 2、 供求、花名册、会员，没有点播
     */
    onInit: function (options) {
        API.Request({
            url: API.MEET_SIGN_GET_INFO,
            success: function (res) {
                console.log(res)
                GP.setData({
                    userInfo: res.data.dict_attendee
                })
            }
        })

        // 获取入场券信息
        API.Request({
            url: API.MEET_SIGN_PAY_GET_INFO,
            success: function (res) {
                console.log(res)
                GP.setData({
                    signList: res.data.list_sign
                })
                // wx.setStorageSync(KEY.USER_INFO, res.data.dict_attendee)
            }
        })
    },

    // 上传信息
    updateInfo(){
        var userInfo = GP.data.userInfo
        if (userInfo.name == "" || userInfo.company == "" || userInfo.phone == "") {
            var n = userInfo.name == "" ? "姓名  " : ""
            var c = userInfo.company =="" ? "企业名称  " : ""
            var p = userInfo.phone == "" ? "手机  " : ""
            wx.showModal({
                title: '温馨提示',
                content: '为了方便联系您，请填写：' +n+c+p ,
            }) 
            return 
        }
        // 上锁
        if ( GP.data.lock == true){
            wx.showModal({
                title: '温馨提示',
                content: '正在上传中，请别着急',
            })
            return 
        }
        GP.setData({
            lock:true,
        })
        API.Request({
            url: API.MEET_SIGN_SET_INFO,
            data: {
                name: userInfo.name,
                company: userInfo.company,
                phone: userInfo.phone,
            },
            success: function (res) {
                console.log(res)
                // GP.setData({
                //     userInfo: res.data.dict_attendee
                // })
            },
            complete:function(res){
                GP.setData({
                    lock: false,
                })
            },
        })
    },



})