

module.exports = new (function () {

  var self = this
  var GP = null
  this.init = function (_GP){
    GP = _GP
  }
  //更新自己的栏目
  // this.sendSelf = function (content, nickname, avatar_url, is_teacher) {
  //   console.log(e.detail)
  //   var value = e.detail
  //   var talk = {
  //     content: value,
  //     content_type: 0,
  //     contract_info: '',
  //     myDate: '',
  //     role: !is_teacher,
  //     img: "../../images/hotapp_01_07.png"
  //   }
  //   var list = GP.data.feedback
  //   list.push(talk)
  //   GP.setData({
  //     feedback: list
  //   })
  // }

  this.listenMessage = function (content, nickname, avatar_url ,is_teacher){
    var msg = {
      content: content,
      content_type: 0,
      contract_info: '',
      myDate: '',
      role: !is_teacher,
      img: avatar_url
    }
    var list = GP.data.feedback
    list.push(msg)
    GP.setData({
      feedback: list
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