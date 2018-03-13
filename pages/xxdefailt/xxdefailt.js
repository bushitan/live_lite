
var GP
var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');


Page({
    data: {
       
    },
   

    onLoad: function (options) {
        GP = this

        GP.setData({ isSign: wx.getStorageSync(KEY.IS_SIGN) == true ? true :false})
        GP.onInit()
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
})