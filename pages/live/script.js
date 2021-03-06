

var KEY = require('../../utils/key.js');
var msg_id = 0
module.exports = new (function () {

  var self = this
  var GP = null
  this.init = function (_GP){
    GP = _GP
  }
  
  //获取当前房间所有的message

  //监听信息，增加message
  this.listenMessage = function (nick_name, avatar_url, is_teacher, style, _content){
    // var MESSAGE_TEXT = 0,
    //   MESSAGE_IMAGE = 1,
    //   MESSAGE_AUDIO = 2,

    var content = ""
    var audio_url = ""
    var image_url = ""
    if (style == KEY.MESSAGE_TEXT)
      content = _content
    else if (style == KEY.MESSAGE_IMAGE)
      image_url = _content
    else
      audio_url = _content

    var list = GP.data.messageList
    ++msg_id
    var id = "a" + msg_id
    list.push({
      id: id ,
      nick_name: nick_name,
      avatar_url: avatar_url,
      is_teacher: is_teacher,
      style: style,
      content: content,
      audio_url: audio_url,
      image_url: image_url,
    },)
    GP.setData({
      messageList: list,
    })
  }

  this.ChangePlayer = function (index) {
    switch (index) {
      case 0: 
        GP.setData({
          showPlayerIM: true,
          showPlayerPainter: false,
        }); 
        break;
      case 1: 
        GP.setData({
          showPlayerIM: false,
          showPlayerPainter: true,
        })
        break;
    }
  }

  this.ChangePusher = function (index) {
    var show = {
      Pusher: true,
      IM: false,
      Player: false,
      PusherMenu: false,
      Cover: false,
      Painter: false,
      Gallery: false,
    }
    switch (index) {
      case 0: show.IM = true; break;
      case 1: show.Painter = true; break;
      case 2: show.Gallery = true; break;
      case 3: show.PusherMenu = true; break;
      case 4: show.Player = true; break;
    }
    GP.setData({
      show: show
    })
  }
})