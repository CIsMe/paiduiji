// pages/tuijian/tuijian.js
Page({
  data: {
    content: "",
    rongE: "",
    detail: ""
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
    if (options.pingjia == "完成") {
      console.log("评价完成")
      this.setRongE()

    }
    this.reqUrl();
  },
  setRongE: function () {
    this.setData({ rongE: "恭喜获赠100元融e购购物券 ,请点击:" })
    this.setData({ detail: "详情" })

  },
  openRongE:function(e){
      console.log("打开融e购")
  }
})