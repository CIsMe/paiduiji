// pages/near/near.js
//获取应用实例
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
function toRad(d) { return d * Math.PI / 180; }

function getDistance(lat1, lng1, lat2, lng2) {
  //#lat为纬度, lng为经度, 一定不要弄错
  var dis = 0;
  var radLat1 = toRad(lat1);
  var radLat2 = toRad(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRad(lng1) - toRad(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return Math.round(dis * 6378137);
}
var app = getApp()
Page({
  data: {
    tabs: ["网点", "自助银行", "可预约", ""],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    motto: '示例小程序-获取当前地理位、速度',
    userInfo: {},
    hasLocation: true,
    location: {
      latitude: '23.1065995692',
      longitude: '113.3244326464',
    },
    cur_location: {
      latitude: '23.1065995692',
      longitude: '113.3244326464',
    },
    map: {
      width: 100,
      height: 100
    },
    hidden: true,
    bank: '',
    list: [],
    markers: [],
    netinfos: [],
    sel_marker: {},
    controls: [{
      id: 2,
      iconPath: '../../image/location2.png',
      position: {
        left: 20,
        top: 450,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },
  onShareAppMessage: function () {
    return {
      title: '工行网点服务',
      desc: '附近',
      path: '/pages/near'
    }
  },
  regionchange(e) {
    var that = this
    console.log(e)
    console.log(e.type)
    if (e.type == 'end') {
      that.getData();
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.lightMarker(e.markerId)
    this.showDetail(e.markerId)

  },
  maptap(e) {
    console.log('maptap')
  },
  controltap(e) {
    var that = this
    console.log(e.controlId)
    // this.showList()
    if (e.controlId == 1) {
      that.moveToLocation()
    }
    if (e.controlId == 2) {
      that.resetLocation()
    }
    if (e.controlId == 3) {
      that.showList()
    }

    // var that = this
    //   that.setData({
    //   hidden: false
    // })
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.data['bank'] = e.detail.value
  },
  confirm: function () {
    var key = 'hidden'
    var changedData = {}
    changedData[key] =
      this.data[key] === false
    this.setData(changedData)
  },
  showDetail: function (mid) {
    var that = this
    var arr_list = new Array()
    that.getMarker(mid)
    var distance = getDistance(that.data['cur_location'].latitude, that.data['cur_location'].longitude, that.data['sel_marker'].latitude, that.data['sel_marker'].longitude)
    console.log(that.data['sel_marker'])
    arr_list.push(that.data['sel_marker'].name)
    arr_list.push(that.data['sel_marker'].desc)
    arr_list.push("距离：" + distance + "米，导航")
    arr_list.push("取号")
    wx.showActionSheet({
      itemList: arr_list,
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {

        }
        if (res.tapIndex == 1) {

        }
        if (res.tapIndex == 2) {
          wx.openLocation({
            longitude: Number(that.data['sel_marker'].longitude),
            latitude: Number(that.data['sel_marker'].latitude),
            name: that.data['sel_marker'].name,
            address: that.data['sel_marker'].desc
          })
        }
        if (res.tapIndex == 3) {
          wx.navigateTo({
            url: '../queue/queue',
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })

  },
  showList: function () {
    console.log(this.data['list'])

    var arrmids = new Array()
    this.data['markers'].forEach(function (e) {
      arrmids.push(e.id)
    })

    wx.navigateTo({
      url: '../list/list?id=' + arrmids,
    })
  },
  getCenterLocation: function () {
    var that = this
    this.mapCtx.getCenterLocation({
      success: function (res) {
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
  lightMarker: function (mid) {
    var that = this
    var arr_marker = new Array()
    that.data['markers'].forEach(function (e) {
      // console.log(e.id)
      if (e.id == mid) {
        arr_marker.push({
          id: e.id,
          latitude: e.latitude,
          longitude: e.longitude,
          width: 20,
          height: 30,
          iconPath: '../../image/red.png',
          name: e.name,
          desc: e.desc
        });
      } else {
        arr_marker.push({
          id: e.id,
          latitude: e.latitude,
          longitude: e.longitude,
          width: 20,
          height: 30,
          iconPath: '../../image/green.png',
          name: e.name,
          desc: e.desc
        });
      }
    })
    console.log('arr_marker:' + arr_marker)
    that.setData({
      markers: arr_marker
    })
  },
  getMarker: function (mid) {
    var that = this
    that.data['markers'].forEach(function (obj) {
      if (obj.id == mid) {
        console.log(obj)
        that.setData({
          sel_marker: obj
        })
      }
    })
  },
  getNetname: function (mid) {
    var that = this
    var res = ""
    that.data['markers'].forEach(function (e) {
      console.log(e.id)
      console.log(mid)
      if (e.id == mid) {
        res = e.name
      }
    })
    return res
  },
  getNetdesc: function (mid) {
    var that = this
    var res = ""
    that.data['markers'].forEach(function (e) {
      console.log(e.id)
      console.log(mid)
      if (e.id == mid) {
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
        id: '0',
        latitude: 23.099994,
        longitude: 113.324520,
        width: 20,
        height: 20,
        name: 'T.I.T 创意园',
        desc: '我现在的位置'
      }, {
        id: '1',
        latitude: 23.1065995692,
        longitude: 113.3244326464,
        width: 20,
        height: 20,
        name: '广州塔',
        desc: '广州塔'
      }, {
        id: '2',
        latitude: 23.1027375692,
        longitude: 113.3274466464,
        width: 20,
        height: 20,
        name: '珠江帝景',
        desc: '珠江帝景'
      }],
      list: ['T.I.T 创意园', '广州塔', '珠江帝景']
    })
    this.data['markers'].forEach(function (e) {

      wx.setStorage({
        key: e.id,
        data: e
      })

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

  getData: function () {
    var that = this;
    that.getCenterLocation()
    wx.request({
      // url: 'https://eapply.abchina.com/entapply/api/values/Get', //仅为示例，并非真实的接口地址
      url: 'https://skipper.applinzi.com/api/net2', //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        logitude:this.data['location'].longitude ,
        latitude:this.data['location'].latitude ,
        distance: '5000',
        businessType: '2'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log("res.data" + res.data)
        var arr_marker = new Array()
        var arr_list = new Array()
        res.data.forEach(function (e) {
          arr_marker.push({
            // id:e.BranchId,
            latitude: e.Latitude,
            longitude: e.Longitude,
            width: 20,
            height: 30,
            iconPath: '../../image/green.png',
            name: e.Name,
            desc: e.机构地址
          });
          arr_list.push(e.Name)
        })
        that.setData({
          markers: arr_marker,
          list: arr_list,
          netinfos: res.data.BranchSearchRests
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
  // getMarker: function () {
  //   wx.chooseLocation({
  //       success: function (obj) {
  //         console.log(res.name)
  //       }
  //   })
  // },
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
      url: '../paidui/paidui?id=' + this.data['bank']
    })
  },
  onLoad: function () {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          map: {
            width: res.windowWidth,
            height: res.windowHeight
          },
          cur_location: {

          }
        });
      }
    });
    console.log('onLoad')
    console.log(that.data['map'].width)
  },
  tabClick: function (e) {
    console.log(e);
    var that = this

    if (e.currentTarget.id == 1) {
      that.moveToLocation()
    }
    if (e.currentTarget.id == 2 || e.currentTarget.id == 3) {
      that.showList()
    }
    // this.setData({
    //     sliderOffset: e.currentTarget.offsetLeft,
    //     activeIndex: e.currentTarget.id
    // });
  },
  onReady: function () {
    // 页面渲染完成
    console.log('onready')
    console.log(this.data['netinfos'])
    // 使用 wx.createMapContext 获取 map 上下文 
    this.data['netinfos'].forEach(function (e) {
      wx.setStorage({
        key: e.BranchId,
        data: e
      })
    })
    var that = this
    that.mapCtx = wx.createMapContext('myMap')

    wx.getLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          hasLocation: true,
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          cur_location: {
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
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})