//index.js
//获取应用实例
var app = getApp()
var types = ['default', 'primary', 'warn']
var pageObject = {
  data: {
    motto: '欢迎使用工行扫码排队系统',
    userInfo: {},
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false,
    hidden: true,
    nocancel: false
  },
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
    console.log("clicked confirm");
  },
  setDisabled: function (e) {
    this.setData({
      disabled: !this.data.disabled
    })
  },
  setPlain: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },
  setLoading: function (e) {
    this.setData({
      loading: !this.data.loading
    })
  }
  ,
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
}

for (var i = 0; i < types.length; ++i) {
  (function (type) {
    pageObject[type] = function (e) {
      wx.scanCode({
        success: (res) => {
          console.log("我已经扫码完成,将要发送报文到BIOM服务器 " + res)
          
          //TODO

        },
        fail: (res) => {
          console.log("我已经扫码了,不知道为什么会失败 " + res)
          var key = 'hidden'
          var changedData = {}
            changedData[key] =
        this.data[key] === false
        this.setData(changedData)
        }
      })
    }
  })(types[i])
}
Page(pageObject)


