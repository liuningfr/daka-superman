Page({
  chooseImg() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res.tempFilePaths);
      },
    });
  },
});
