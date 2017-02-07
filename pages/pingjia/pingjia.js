// pages/pingjia/pingjia.js
Page({
  data: {
    teller: "",
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../image/normal.png',
    selectedSrc: '../../image/selected.png',
    halfSrc: '../../image/half.png',
    key: 0,//评分
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

  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })

  },
  //点击左边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },

  setTellerNo: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.teller)
    var tells = options.teller;
    var tellerNo = tells.substring("推介:".length)
    console.log(tellerNo)

    this.setData({
      teller: tellerNo + " "
    })
  }
  ,
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setTellerNo(options);
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