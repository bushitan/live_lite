
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
          url: API.LITE_USER_GET_PPT,
            success: function (res) {
                console.log(res)
                GP.setData({
                  pptList: res.data.ppt_list
                })
            }
        })

        //获取房间列表
        API.Request({
          url: API.ROOM_GET_LIST_BY_APP,
          success: function (res) {
            console.log(res.data.list_tag)
            var _tab_list = []
            for (var i = 0; i < res.data.room_list.length; i++)
              _tab_list.push(res.data.room_list[i].name)

            GP.setData({
              currentTabList: _tab_list,
              roomList: res.data.room_list
            })
            // GP.getCoverList(res.data.list_tag[0].tag_id)
          }
        })

        // 获取入场券信息
        // API.Request({
        //     url: API.MEET_SIGN_PAY_GET_INFO,
        //     success: function (res) {
        //         console.log(res)
        //         GP.setData({
        //             signList: res.data.list_sign
        //         })
        //         // wx.setStorageSync(KEY.USER_INFO, res.data.dict_attendee)
        //     }
        // })
    },
})