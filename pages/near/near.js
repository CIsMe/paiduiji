// pages/near/near.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '示例小程序-获取当前地理位、速度',
    userInfo: {},
    hasLocation: true,
    location: {
      latitude: '23.1065995692',
      longitude: '113.3244326464',
    },
    map:{
      width:100,
      height:100
    },
    hidden: true,
    bank:'',
    items: [
      { name: '工商银行工业园支行', value: '工商银行工业园支行', checked: 'true' },
      { name: '工商银行员村新街支行', value: '工商银行员村新街支行' },
      { name: '工商银行员村支行', value: '工商银行员村支行' },
    ],
    list:[],
    markers: [],
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
    controls: []
  },
  onShareAppMessage: function () {
    return {
      title: '码上约',
      desc: '附近',
      path: '/pages/near'
    }
  },
  controlinit:function(){
    var that = this
    console.log("control:" + that.data['map'].height+","+that.data['map'].width)
    var ctrlitem = [{
        id: 1,
        iconPath: '../../image/btntst.png',
        position: {
          left: 30,
          top: 300,
          width: 90,
          height: 30
        },
        clickable: true
      },{
        id: 2,
        iconPath: '../../image/btnloc.png',
        position: {
          left: 30,
          top: 340,
          width: 90,
          height: 30
        },
        clickable: true
      },{
        id: 3,
        iconPath: '../../image/btnnet.png',
        position: {
          left: 30,
          top: 380,
          width: 90,
          height: 30
        },
        clickable: true
      }]
      that.setData({
        controls:ctrlitem
      })
  },
  regionchange(e) {
    var that = this
    console.log(e)
    console.log(e.type)
    if(e.type == 'end'){
      that.getData();
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.lightMarker(e.markerId)
    this.showDetail(e.markerId)
  },
  maptap(e){
    console.log('maptap')
  },
  controltap(e) {
    var that = this
    console.log(e.controlId)
    // this.showList()
    if(e.controlId == 1){
      that.moveToLocation()
    }
    if(e.controlId == 2){
      that.resetLocation()
    }
    if(e.controlId == 3){
      that.showList()
      // wx.showModal({
      //   title: '网点列表',
      //   content: '<button>HHHH</button>',
      //   success: function(res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //       that.showList()
      //     }
      //   }
      // })
    }

    // var that = this
    //   that.setData({
    //   hidden: false
    // })
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
  showDetail:function(mid){
    var arr_list = new Array()
    arr_list.push(this.getNetname(mid))
    arr_list.push(this.getNetdesc(mid))
    arr_list.push("取号")
    arr_list.push("导航")
    wx.showActionSheet({
      itemList:arr_list,
      success: function(res) {
        console.log(res.tapIndex)
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })

  },
  showList:function(){
    console.log(this.data['list'])
    
    wx.navigateTo({
      url: '../list/list?id='+this.data['list'],
    })
  },
  getCenterLocation: function () {
    var that = this
    this.mapCtx.getCenterLocation({
      success: function(res){
        console.log(res.longitude)
        console.log(res.latitude)
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
  lightMarker:function(mid){
    var that = this
    var arr_marker = new Array()
    that.data['markers'].forEach(function(e){
      // console.log(e.id)
      if(e.id == mid ){
        arr_marker.push({
          id:e.id,
          latitude:e.latitude,
          longitude:e.longitude,
          width:20,
          height:30,
          iconPath:'../../image/red.png',
          name:e.name,
          desc:e.desc
        });        
      } else {
        arr_marker.push({
          id:e.id,
          latitude:e.latitude,
          longitude:e.longitude,
          width:20,
          height:30,
          iconPath:'../../image/green.png',
          name:e.name,
          desc:e.desc
        });
      }
    })
    console.log('arr_marker:'+arr_marker)
    that.setData({
      markers: arr_marker
    })
  },
  getNetname:function(mid){
    var that = this
    var res = ""
    that.data['markers'].forEach(function(e){
      console.log(e.id)
      console.log(mid)
      if(e.id == mid ){
        res = e.name
      } 
    })
    return res
  },
  getNetdesc:function(mid){
    var that = this
    var res = ""
    that.data['markers'].forEach(function(e){
      console.log(e.id)
      console.log(mid)
      if(e.id == mid ){
        res = e.desc
      } 
    })
    return res
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
      }],
      list:['T.I.T 创意园','广州塔','珠江帝景']
    })

    // this.mapCtx.moveToLocation()
  },
  resetLocation: function () {
    var that = this
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
    that.mapCtx.moveToLocation()
  },
  testReq:function(){
    var that = this
    wx.request({
      url: 'https://skipper.applinzi.com/api',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data)
        that.data['content'] = res.data
        that.setData({
          content: res.data
        })
      },
      fail: function () {
        console.log("fail")
      },
      complete: function () {
        // complete
        console.log("complete")
      }
    })
  },
  getData:function(){
    var that = this;
    that.getCenterLocation()
    wx.request({
      url: 'https://eapply.abchina.com/entapply/api/values/Get', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        logitude:this.data['location'].latitude,
        latitude:this.data['location'].longitude,
        distance:'5000',
        businessType:'2'
      },
      header: {
          'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data.BranchSearchRests)
        
        var arr_marker = new Array()
        var arr_list = new Array()
        res.data.BranchSearchRests.forEach(function(e){  
          arr_marker.push({
            id:e.BranchId,
            latitude:e.Latitude,
            longitude:e.Longitude,
            width:20,
            height:30,
            iconPath:'../../image/green.png',
            name:e.Name,
            desc:e.FullAddress
          });
          arr_list.push(e.Name)
        })
        that.setData({
          markers: arr_marker,
          list:arr_list
        })
      }
    })
  },
  openLocation: function () {
    wx.openLocation({
      latitude: this.data['location'].latitude,
      longitude: this.data['location'].longitude,
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
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        that.setData({
          map:{
            width:res.windowWidth,
            height:res.windowHeight
          } 
        })
      }
    })
    console.log('onLoad')
    console.log(that.data['map'].width)
    // that.controlinit()
    that.testReq()
  },
  onReady: function () {
    // 页面渲染完成
    // 使用 wx.createMapContext 获取 map 上下文 
    var that = this
    that.mapCtx = wx.createMapContext('myMap')
    
    // that.controlinit()
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
    this.mapCtx.moveToLocation()
  },
  onShow: function () {
    // 页面显示
    this.controlinit()
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})