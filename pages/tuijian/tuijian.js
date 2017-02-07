// pages/tuijian/tuijian.js
Page({
  data: { content: ""
   },
  reqUrl: function () {
    var that = this
    wx.request({
      url: 'https://skipper.applinzi.com/api/pro',
      data: {},
      method: 'GET', 
      success: function (res) {
        console.log(res.data)
        that.setData({
          content: res.data.opdata.jsonData2
        })
        console.log(that.data["content"][1])


        // success
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        // complete
        console.log("complete")
      }
    })
  }
  ,
  onLoad: function (options) {
    this.reqUrl();
  },
})