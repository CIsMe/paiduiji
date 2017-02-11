// pages/paidui/paidui.js

var app = getApp()

Page({
  data:{
     hidden: false,
     bank:'',
     where:'',
      userInfo: {},
      defaultSize: 'default',
      primarySize: 'default',
      warnSize: 'default',
      disabled: false,
      plain: false,
      loading: false,
      hidden: true,
      nocancel: false,
      grids: [0, 1, 2, 3, 4, 5, 6, 7, "清除缓存"]
  },
  onShareAppMessage: function () {
    return {
      title: '工行网点服务',
      desc: '附近',
      path: '/pages/near'
    }
  },
  confirm: function () {
    var key = 'hidden'
    var changedData = {}
    changedData[key] =
      this.data[key] === false
    this.setData(changedData)
  },
  return:function(){
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  } ,
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id)
    this.data['bank']=options.id
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})