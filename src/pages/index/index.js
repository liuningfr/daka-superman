Page({
  data: {
    iPhoneX: false,
    list: [1],
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhoneX: res.model.indexOf('iPhone X') > -1 });
      },
    });
  },
  goDetail() {
    wx.navigateTo({ url: '/pages/detail/detail' });
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/edit/edit' });
  },
});
