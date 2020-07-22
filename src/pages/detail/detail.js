import request from '@/utils/request';

Page({
  data: {
    isDone: false,
    iPhone: false,
    detail: {},
  },
  async onLoad({ task_id }) {
    const data = await request('/api/xrm/task/detail', { params: { id: task_id } });
    this.setData({ detail: data });
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhone: res.model.indexOf('iPhone') > -1 });
      },
    });
  },
  onShareAppMessage() {
    return {
      title: '跟我一起成为打卡超人吧！',
      path: '/pages/index/index',
    };
  },
  goEdit() {
    wx.navigateTo({ url: '/pages/edit/edit?edit=1' });
  },
  touchDaka() {
    this.setData({ isDone: true });
  },
});
