//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    logs: [],
    netlists:[]
  },
  showInput: function () {
      this.setData({
          inputShowed: true
      });
  },
  hideInput: function () {
      this.setData({
          inputVal: "",
          inputShowed: false
      });
  },
  clearInput: function () {
      this.setData({
          inputVal: ""
      });
  },
  inputTyping: function (e) {
      this.setData({
          inputVal: e.detail.value
      });
    },
  onReady:function(options){
    // console.log(options)
    // console.log(this['list'])
    // var opt_str = options.id
    // var arr_opt = new Array()
    // for(var i = 0;i < opt_str.split(',').length;i++){
    //   arr_opt.push(opt_str.split(',')[i])
    // }
    // this.setData({
    //   list:arr_opt
    // })
  },
  onLoad: function (options) {
    console.log(options)
    // this.data['list']=options.id
    // console.log(this['list'])
    var opt_str = options.id
    var arr_nets = new Array()
    // for(var i = 0;i < opt_str.split(',').length;i++){
    //   arr_opt.push(opt_str.split(',')[i])
    // }
    for(var i = 0;i < opt_str.split(',').length;i++){
      // arr_opt.push(opt_str.split(',')[i])
      wx.getStorage({
        key: opt_str.split(',')[i],
        success: function(res) {
            console.log(res.data)
            arr_nets.push(res.data)
        } 
      })
    }

    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(function (log) {
      //   return util.formatTime(new Date(log))
      // }),
      netlists:arr_nets
    })
  }
})
