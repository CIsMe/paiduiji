// pages/pingjia/pingjia.js
Page({
  data: {
    teller: "",
    detail: "",

    tag: [
      { text: "柜员态度很好", selected: false },
      { text: "柜员很热心", selected: false },
      { text: "网点环境很好", selected: false },
      { text: "业务办理很顺利", selected: false },
      { text: "排队时间长", selected: false }],
    items: [
      { name: '满意', value: '满意', checked: 'true' },
      { name: '一般', value: '一般' },
      { name: '不满意', value: '不满意' },
    ],
  },
  selectTag: function (e) {
    var oldtext=this.data["detail"]
    if(oldtext==null||oldtext==undefined){
      oldtext="";
    }
    this.setData({detail: oldtext+e.currentTarget.dataset.testid.text+","})
    console.log(  e.currentTarget.dataset.testid);
  }
  ,
  forsubmit: function (e) {
    console.log("submit" + this.data["detail"]);
  },


  ok: function (res) {

    console.log("hello" + res.detail.values);
    wx.navigateTo({
      url: '../tuijian/tuijian?pingjia=完成'
    })
  }
  ,
  bindTextAreaBlur: function (e) {
    this.setData({ detail: e.detail.value })
    console.log(this.data["detail"]);

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

  }
})