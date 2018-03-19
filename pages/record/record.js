// pages/cover/cover.js
var GP

var APP = getApp()
var API = require('../../utils/api.js');
var KEY = require('../../utils/key.js');
var QINIU = require('../../utils/qiniu.js');
var RECORD = require('../../utils/record.js');

// var JMessage = require('../../utils/jmessage-wxapplet-sdk-1.4.0.min.js')
// var MD5 = require('../../utils/md5.js')
// var RANDOM = require('../../utils/random.js')

// var jim = new JMessage({
//     // debug : true
// });

Page({

  /**
   * 页面的初始数据
   */
  data: {
        currentTabList: ["最新通知", "学习天地"],
        audioList:[],
        //上传
        isUpdate: false,
        //录音
        showRecordDialog: true, //显示录音界面
        isRecording: false,
        isAbleUpload: false, // 录音完成才能上传
        clock: '录音倒计时：(60)秒',
    //   coverIndex:0,
    },

    // 点击tab
    clickTag(e) {
        console.log(e.detail)
        var index = e.detail

    },  


    // uploadRecord() {
    //     QINIU.UploadAudio(GP)
    // },
    //开始录音的时候
    start: function () {

        //开始后，禁止上传文件
        GP.setData({
            isRecording: true,
        })

        RECORD.Start()

    },
    //停止录音
    stop: function () {
        RECORD.Stop()

        
        

        GP.setData({
            isRecording: false,
            isAbleUpload: true,
        })
    },
    //播放声音
    play: function () {
        RECORD.Play()
        var audioList = GP.data.audioList
        audioList.push(RECORD.GetAudioFile())
        GP.setData({
            audioList: audioList
        })
    },
    playUrl(e){
        var url = e.currentTarget.dataset.url
        RECORD.PlayUrl(url)

    },

    /**上传录音 */
    uploadRecord() {
        QINIU.UploadAudio(GP, RECORD.GetAudioFile())

    },

    
    onLoad(){
        GP = this
        RECORD.Init(GP)  //配置录音参数
    },


})