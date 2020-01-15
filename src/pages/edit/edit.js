Page({
  data: {
    remind: false,
    showTimePicker: false,
    timeText: '',
    time: [0, 0],
    uploadImg: '',
    selectedIcon: 'avatar',
    name: '',
  },
  onLoad(options) {
    if (options.edit) {
      wx.setNavigationBarTitle({ title: '编辑打卡' });
    } else {
      wx.setNavigationBarTitle({ title: '创建打卡' });
    }
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
        this.setData({ uploadImg: res.tempFilePaths, selectedIcon: '' });
      },
    });
  },
  toggleRemind() {
    const { remind } = this.data;
    this.setData({ remind: !remind });
  },
  tapTime() {
    this.setData({ showTimePicker: true });
  },
  chooseTime(e) {
    const { value } = e.detail;
    if (value.length > 0) {
      const hour = value[0].toString().length === 1 ? `0${value[0]}` : value[0];
      const minute = value[1].toString().length === 1 ? `0${value[1]}` : value[1];
      this.setData({ timeText: `${hour}:${minute}` });
    }
  },
  chooseIcon(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({ selectedIcon: index, uploadImg: '' });
  },
  delImg() {
    this.setData({ selectedIcon: 'avatar', uploadImg: '' });
  },
  changeName(e) {
    this.setData({ name: e.detail.value });
  },
  clearName() {
    this.setData({ name: '' });
  },
  finishDaka() {
    wx.showToast({
      title: '创建成功',
      duration: 2000,
      mask: true,
    });
  },
  deleteDaka() {
    wx.showModal({
      title: '确认删除该打卡么?',
      confirmColor: '#FA5151',
      cancelColor: '#999999',
      success(res) {
        if (res.confirm) {
          wx.showToast({
            title: '删除成功',
            duration: 2000,
            mask: true,
          });
        }
      },
    });
  },
});
