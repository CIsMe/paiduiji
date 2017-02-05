//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    list:[]
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
    this.data['list']=options.id
    console.log(this['list'])
    var opt_str = options.id
    var arr_opt = new Array()
    for(var i = 0;i < opt_str.split(',').length;i++){
      arr_opt.push(opt_str.split(',')[i])
    }
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(function (log) {
        return util.formatTime(new Date(log))
      }),
      list:arr_opt
    })
  }
})
