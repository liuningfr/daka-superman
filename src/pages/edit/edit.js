Page({
  data: {
    remind: false,
    showTimePicker: false,
  },
  onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhoneX: res.model.indexOf('iPhone X') > -1 });
      },
    });
  },
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths);
      },
    });
  },
  toggleRemind() {
    const { remind } = this.data;
    this.setData({ remind: !remind });
  },
  chooseTime() {
    this.setData({ showTimePicker: true });
  },
});
