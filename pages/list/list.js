//logs.js
var util = require('../../utils/util.js')
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    logs: [],
    searchResult:[],
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
        var arr_res = new Array()
        var that = this
        that.setData({
            inputVal: e.detail.value,
        });
        console.log(e.detail.value)
        that.data['netlists'].forEach(function(obj){ 
            if ( obj.Name.indexOf(e.detail.value) > 0 ){
                arr_res.push(obj)
            }     
        })
        that.setData({
            searchResult: arr_res,
        });
        console.log('searchResult')
        console.log(this.data['searchResult'])
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

    wx.getStorageInfo({
    success: function(res) {
        console.log(res.keys)
        console.log(res.currentSize)
        console.log(res.limitSize)
    }
    })
    console.log(options)
    // this.data['list']=options.id
    // console.log(this['list'])
    var opt_str = options.id
    var arr_nets = new Array()
    // for(var i = 0;i < opt_str.split(',').length;i++){
    //   arr_opt.push(opt_str.split(',')[i])
    // }
    console.log(opt_str.split(',').length);
    for(var i = 0;i < opt_str.split(',').length;i++){
      // arr_opt.push(opt_str.split(',')[i])
        // try {
        //     var value = wx.getStorageSync(i.toString())
        //     if (value) {
        //         // Do something with return value
        //         arr_nets.push(value)
        //         console.log(value)
        //     }
        // } catch (e) {
        // // Do something when catch error
        // }
        wx.getStorage({
            key: opt_str.split(',')[i],
            success: function(res) {
                console.log("netlist:"+res.data)
                arr_nets.push(res.data)
            } 
        })
    }
    console.log(arr_nets)
    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(function (log) {
      //   return util.formatTime(new Date(log))
      // }),
      netlists:arr_nets
    })

  }
})
