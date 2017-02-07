// pages/tuijian/tuijian.js
Page({
  data: { 
    content: "推介",
    products:[],
    products2:[],
  
},
  // getData: function () {
  //   var json = {
  //     contry: {
  //       area: {
  //         man: "12万",
  //         women: "10万"
  //       }
  //     }
  //    eval(json)
  //   }
  // }

  // ,
  reqUrl: function () {
    var that = this
    wx.request({
      url: 'https://skipper.applinzi.com/api/pro',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data.opdata.jsonData2)
        console.log(res.data.opdata.jsonData3)
        // that.data['content'] = res.data
        that.setData({
          content: res.data,
          products:res.data.opdata.jsonData2,
          products2:res.data.opdata.jsonData3
        })

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
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})