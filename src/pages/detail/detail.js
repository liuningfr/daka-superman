Page({
  data: {
    isDone: false,
    iPhoneX: false,
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhoneX: res.model.indexOf('iPhone X') > -1 });
      },
    });
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/edit/edit?edit=1' });
  },
  touchDaka() {
    this.setData({ isDone: true });
  },
});
