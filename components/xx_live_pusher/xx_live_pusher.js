// components/xx_cover_news/xx_cover_news.js
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        title: {
            type: String,
            value: "标记",
        },
        width: {
            type: String,
            value: "100%",
        },
        height: {
            type: String,
            value: "400rpx",
        },
        mode: {
            type: String,
            value: "RTC",
        },
        menu: {
            type: Boolean,
            value: true,
        },

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      // 改变
    _change(newVal, oldVal) {
    },
    click(){
        console.log(213)
        wx.showActionSheet({
            itemList: ["前置","后置"],
        })
    },


    switch2Change(e) {
        if (e.detail.value)
            GP.setData({ mode: "RTC" })
        else
            GP.setData({ mode: "SD" })
    },


    statechange(e) {
        console.log('live-pusher code:', e.detail.code)
    },
    statechangePlayer(e) {
        console.log('live-player code:', e.detail.code)
    },
    error(e) {
        console.error('live-player error:', e.detail.errMsg)
    },

  }
})
