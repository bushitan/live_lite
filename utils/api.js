'use strict';

/* api.js  公共类
    小程序的api接口集合 
 */ 

var host_url = 'http://192.168.199.204:8000/live/';

// var host_url = 'http://127.0.0.1:8000/live/'; 
// var host_url = 'https://www.12xiong.top/live/';

function Request(options) {
    // url, data, success, fail, complete

    var data =  options.data
    if (data == undefined)
        data = {}
    // data['session'] = wx.getStorageSync("session")  //每个请求都加session
    wx.request
        ({
            url: options.url,
            method: "GET",
            data: data,
            success: function (res) {
                if (options.success != undefined)
                    options.success(res)
            },
            fail: function (res) {
                if (options.fail != undefined)
                    options.fail(res)
            },
            complete: function (res) {
                if (options.complete != undefined)
                    options.complete(res)
            },
        })
}


module.exports = {
    Request: Request,
    LITE_LOGIN: host_url + 'lite/login/',
    LITE_COMPANY_GET_INFO: host_url + 'lite/company/get/info/',

    COVER_TAG_GET_LIST: host_url + 'cover/tag/get_list/',
    COVER_NEWS_GET_LIST: host_url + 'cover/news/get_list/',
    COVER_ARTICLE_GET: host_url + 'cover/article/get/',


    // DAY_INDEX: host_url + 'day365/my/set/clock/',

};

