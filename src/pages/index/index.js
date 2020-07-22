import request from '@/utils/request';

Page({
  data: {
    iPhoneX: false,
    list: [],
  },
  async onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhoneX: res.model.indexOf('iPhone X') > -1 });
      },
    });
    const res = await request('/api/xrm/task/list');
    this.setData({ list: res });
  },
  onShareAppMessage() {
    return {
      title: '跟我一起成为打卡超人吧！',
      path: '/pages/index/index',
    };
  },
  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/detail?task_id=${id}` });
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/edit/edit' });
  },
});
