

module.exports = new (function () {

  var self = this
  var GP = null
  this.init = function (_GP){
    GP = _GP
  },
  //更新自己的栏目
  this.sendSelf = function (e) {
    console.log(e.detail)
    var value = e.detail
    var talk = {
      content: value,
      content_type: 0,
      contract_info: '',
      myDate: '',
      role: true,
      img: "../../images/hotapp_01_07.png"
    }
    var list = GP.data.feedback
    list.push(talk)
    GP.setData({
      feedback: list
    })
  }
})