// compenonts/xx_im/xx_im.js
// feedback: [
//     {
//         content: '你可以留下联系方式，文本，图片，进行反馈',
//         content_type: 0,
//         contract_info: '',//弹出框input值
//         myDate: '2018-01-05 12:45',
//         role: false,
//         img: '../../images/hotapp_01_03.png',
//     }, 
// ]


Component({
  /**
   * 组件的属性列表
   */
  properties: {
        feedback:{
            type:Array,
            value: [ ],
        },
        height:{
            type:String,
            value: "100vh",
        },
  },

    /**
     * 组件的初始数据
     */
    data: {
        rigthArrow: "../../images/hotapp_triangleRight.png",
        leftArrow: "../../images/hotapp_triangleLeft.png",
        inputValue:"",
        scrollTop:0,
    },

    // 组件加载完毕
    ready:function(){
        this.toBottom()
    },
    /**
    * 组件的方法列表
    */
    methods: {
        //   点击预览图片
        clicImage(e){
            console.log(e.currentTarget.dataset.image_url)
            wx.previewImage({
                urls: [e.currentTarget.dataset.image_url],
            })
        },
        // 输入信息
        inputValue(e){
            // console.log()
            this.setData({
                inputValue: e.detail.value
            })
        },

        // 发送信息
        send(){
            if (this.data.inputValue == ""){
                wx.showToast({
                    title: '请输入内容',
                    icon:"loading",
                    duration:500,
                })
                return
            }
            this.triggerEvent('send', this.data.inputValue );  
            this.setData({
                inputValue: ""
            })
            this.toBottom()
        },

        // 滚动哦到底部
        toBottom(){
            var that = this
            var query = wx.createSelectorQuery().in(this)
            query.select('#scroll').boundingClientRect(function (res) {
                console.log(res)
                // res.top // 这个组件内 #the-id 节点的上边界坐标
                that.setData({
                    scrollTop: res.bottom
                })
            }).exec()
        },
    },
})
