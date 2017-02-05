// pages/pingjia/pingjia.js
Page({
  data: {
    teller:"",
    items: [
      { name: '满意', value: '满意', checked: 'true' },
      { name: '一般', value: '一般' },
      { name: '不满意', value: '不满意' },
    ],
  },

  ok: function (res) {
    wx.navigateBack({
      delta: 2, // 回退前 delta(默认为1) 页面
    })
  }
  ,


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.teller)
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