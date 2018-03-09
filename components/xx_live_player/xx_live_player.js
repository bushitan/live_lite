
Component({
  /**
   * 组件的属性列表
   */
    properties: {
        feedback: {
            type: Array,
            value: [],
            // observer: '_changeMessage',
        },
        height: {
            type: String,
            // value: "100vh",
            value: "400rpx",
        },
  },

  /**
   * 组件的初始数据
   */
    data: {
        player:{},
        isFullScreen:false,
        isMessage:true,
    },

    ready() {
        var player = 
        this.setData({
                player: wx.createLivePlayerContext("player", this)
        })
        console.log(this.data.player)
    },
  /**
   * 组件的方法列表
   */
    methods: {
        // 弹幕开关
        switchMessage(){
            this.setData({
                isMessage: !this.data.isMessage
            })
        },

        // 进入全屏
        liveFullScreen() {
            console.log("进入全屏")
            var that = this
            this.data.player.requestFullScreen({
                success: function (res) {
                    that.setData({
                        isFullScreen:true
                    })
                },
                fail: function (res) {
                    console.log(res)
                },
            })
        },
        // 退出全屏
        exitFullScreen() {
            console.log("退出全屏")
            var that = this
            this.data.player.exitFullScreen({
                success: function (res) {

                    that.setData({
                        isFullScreen: false
                    })
                },
                fail: function (res) {
                    console.log(res)
                },
            })
        },


        //   click(e) {     
        //       this.triggerEvent('click', e.currentTarget.dataset.index);
        //   },
        input(e) {
            // console.log(e)
            this.triggerEvent('input', e.detail.value);
        },        
        change(e){
            console.log(e)
            this.setData({
                index: e.detail.value
            })
            this.triggerEvent('change', e.detail.value);
        }
    }
})
