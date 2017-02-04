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
    nocancel: false,
  paidui:'请签到'
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
  

  //事件处理函数
  startScan: function () {
    wx.scanCode({
      success: (res) => {
        console.log("我已经扫码完成,将要发送报文到BIOM服务器 " + res.result)
        console.log('你当前号码为:' + res.result + ',还剩余排队人数为为13人,预估还需等待8分钟,请耐心等候')
           this.data['paidui'] = '你当前号码为:' + res.result + ',还剩余排队人数为为13人,预估还需等待8分钟,请耐心等候'
        var key = 'hidden'
        var changedData = {}
        changedData[key] =
         this.data[key] === false
        this.setData(changedData)
        //TODO


      },

      fail: (res) => {
        console.log("我已经扫码了,不知道为什么会失败 " + res)
      }
    })
  }

  ,
  findNearBank:function(){
    wx.navigateTo({
      url: '../near/near',
    })
  }

  ,
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


Page(pageObject)


