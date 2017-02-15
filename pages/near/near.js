// pages/near/near.js

var util = require('../../utils/util.js')
//获取应用实例
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
function toRad(d) {
  return d * Math.PI / 180;
}

function getDistance(lng1, lat1, lng2, lat2) {
  // #lat为纬度, lng为经度, 一定不要弄错
  var dis = 0;
  var radLat1 = toRad(lat1);
  var radLat2 = toRad(lat2);
  var deltaLat = radLat1 - radLat2;
  var deltaLng = toRad(lng1) - toRad(lng2);
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2)
    + Math.cos(radLat1) * Math.cos(radLat2)
    * Math.pow(Math.sin(deltaLng / 2), 2)));
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
    showType: 0,//0显示全部网点, 1显示自助银行,2显示可预约网点
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
    },
    {
      id: 3,
      iconPath: '../../image/center.png',
      position: {
        left: 178,
        top: 255,
        width: 17,
        height: 33
      },
      clickable: true
    },

    ]
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
      that.nearNetOrAtm();
    }
  },
  markertap(e) {
    console.log(e.markerId)
    this.lightMarker(e.markerId)
    this.showDetail(e)

  },
  maptap(e) {
    console.log('maptap')
  },
  controltap(e) {
    var that = this
    console.log(e.controlId)

    if (e.controlId == 1) {
      that.moveToLocation()
    }
    if (e.controlId == 2) {
      that.resetLocation()
    }
    if (e.controlId == 3) {
      that.showList()
    }
  },
  confirm: function () {
    var key = 'hidden'
    var changedData = {}
    changedData[key] =
      this.data[key] === false
    this.setData(changedData)
  },
  showDetail: function (e) {
    var that = this
    wx.request({ //向服务器获取改网点的详细信息
      url: 'https://skipper.applinzi.com/api/detail',
      data: {
        ID: e.markerId
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        var detailData = res.data;
        var arr_list = new Array()


        var distance = getDistance(that.data['cur_location'].longitude, that.data['cur_location'].latitude, detailData.Longitude, detailData.Latitude)
        arr_list.push(detailData.name)
        arr_list.push(detailData.address)
        arr_list.push("距离：" + distance + "米，导航")
        if (that.data['showType'] != 1) {
          arr_list.push("取号")
        }

        //显示下拉
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
      }
    })




    // console.log("sel_marker" + that.data['sel_marker'])




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
          width: 31,
          height: 40,
          iconPath: '../../image/net_l.png'
          // name: e.name,
          // desc: e.desc
        });
      } else {
        var icon = "../../image/net_n.png"
        if (that.data["showType"] == 1) {
          icon = "../../image/atm_n.png"
        }
        arr_marker.push({
          id: e.id,
          latitude: e.latitude,
          longitude: e.longitude,
          width: 25,
          height: 35,
          iconPath: icon,
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
  },

  nearNetOrAtm: function () {
    var that = this;
    var atm = "net2";
    var icon = "../../image/net_n.png"
    if (this.data["showType"] == 1) {
      atm = "atm"
      icon = "../../image/atm_n.png"
    }
    that.getCenterLocation()
    wx.request({
      url: 'https://skipper.applinzi.com/api/' + atm, //仅为示例，并非真实的接口地址
      method: 'GET',
      data: {
        logitude: this.data['location'].longitude,
        latitude: this.data['location'].latitude,
        distance: '5000',
        businessType: that.data["showType"]
        
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
            id: e.ID,
            latitude: e.Latitude,
            longitude: e.Longitude,
            width: 25,
            height: 35,
            iconPath: icon,
            // name: e.Name,
            // desc: e.机构地址
          });
          arr_list.push(e.ID)
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

    if (e.currentTarget.id == 0) {
      this.setData({
        showType: 0,
      })
      that.nearNetOrAtm()
    }
    else if (e.currentTarget.id == 1) {
      this.setData({
        showType: 1,
      })
      that.nearNetOrAtm()

    }
    else if (e.currentTarget.id == 2) {
      this.setData({
        showType: 2,
      })
      that.nearNetOrAtm()

    }
    else if (e.currentTarget.id == 3) {
      that.showList()
    }
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
  }
})