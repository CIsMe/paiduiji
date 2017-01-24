// pages/near/near.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '示例小程序-获取当前地理位、速度',
    userInfo: {},
    hasLocation: false,
    location: {},
    hidden: false,
    bank:'',
    items: [
      { name: '工商银行工业园支行', value: '工商银行工业园支行', checked: 'true' },
      { name: '工商银行员村新街支行', value: '工商银行员村新街支行' },
      { name: '工商银行员村支行', value: '工商银行员村支行' },
    ]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：',    e.detail.value);
    this.data['bank']=e.detail.value
  },
  confirm: function () {
    var key = 'hidden'
    var changedData = {}
    changedData[key] =
      this.data[key] === false
    this.setData(changedData)
  }
  ,
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //排队选择
  paidui: function () {
    wx.navigateTo({
      url: '../paidui/paidui?id='+this.data['bank']
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
    }),
      wx.getLocation({
        success: function (res) {
          console.log(res)
          that.setData({
            hasLocation: true,
            location: {
              longitude: res.longitude,
              latitude: res.latitude
            }
          })
        }
      })
  }
})