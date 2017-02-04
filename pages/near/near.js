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
    ],
    markers: [{
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 20,
      height: 20,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    },{
      id:1,
      latitude: 23.1065995692,
      longitude: 113.3244326464,
      width: 20,
      height: 20,
      name: '广州塔',
      desc: '广州塔'
    },{
      id:2,
      latitude: 23.1027375692,
      longitude: 113.3274466464,
      width: 20,
      height: 20,
      name: '珠江帝景',
      desc: '珠江帝景'
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.1065995692
      }],
      color:"#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../image/plus.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e)
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
    console.log(this.markers)
  },
  maptap(e){
    console.log('maptap')
  },
  controltap(e) {
    console.log(e.controlId)
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
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    var that = this
    that.mapCtx = wx.createMapContext('myMap')
    // this.getCenterLocation()
    // this.moveToLocation()
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
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.setData({
      hasLocation: true,
      location: {
        longitude: 113.3244326464,
        latitude: 23.1065995692
      },
      markers: [{
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 20,
        height: 20,
        name: 'T.I.T 创意园',
        desc: '我现在的位置'
      },{
        id:1,
        latitude: 23.1065995692,
        longitude: 113.3244326464,
        width: 20,
        height: 20,
        name: '广州塔',
        desc: '广州塔'
      },{
        id:2,
        latitude: 23.1027375692,
        longitude: 113.3274466464,
        width: 20,
        height: 20,
        name: '珠江帝景',
        desc: '珠江帝景'
      }]
    })
    // this.mapCtx.moveToLocation()
  },
  moveToLocation2: function () {
    this.setData({
      location: {},
      markers: []
    })
    this.getCenterLocation()
    this.mapCtx.moveToLocation()
  },
  openLocation: function () {
    wx.openLocation({
      latitude: this.location.latitude,
      longitude: this.location.longitude,
      scale: 28
    })
  },
  getMarker: function () {
    wx.chooseLocation({
        success: function (obj) {
          console.log(res.name)
        }
    })
  },
  getLocation: function () {
    wx.chooseLocation({
        success: function (obj) {
          console.log(res.name)
        }
    })
  },
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
  },
  onLoad: function () {
    console.log('onLoad')
  }
})