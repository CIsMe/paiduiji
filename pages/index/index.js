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
    paidui: '请签到'
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
    var that = this;

    wx.scanCode({
      success: (res) => {

        console.log("扫码结果:" + res.result)
        that.setData(res.result)
        //如果含有推介(暂时这样) 字样的开头, 直接跳转展现产品推荐的画面
        if (res.result.indexOf("推介") ==0) {
           wx.navigateTo({
                url: '../tuijian/tuijian'
              })
          return;
        }
        else if(res.result.indexOf("评价")==0) {

          wx.navigateTo({
            url: '../pingjia/pingjia?teller='+res.result
            // complete
          })
        }



        //TODO


      },

      fail: (res) => {
        console.log("我已经扫码了,不知道为什么会失败 " + res)
      }
    })
  }

  ,
  findNearBank: function () {
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


