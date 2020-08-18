import request from '@/utils/request';

Page({
  data: {
    iPhoneX: false,
    list: [],
    iconList: [
      '../../statics/avatar.png',
      '../../statics/zaoshui.png',
      '../../statics/sports.png',
      '../../statics/english.png',
    ],
  },
  async onLoad() {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({ iPhoneX: res.model.indexOf('iPhone X') > -1 });
      },
    });
    await this.getList();
  },
  async onShow() {
    await this.getList();
  },
  async onPullDownRefresh() {
    await this.getList();
    wx.stopPullDownRefresh();
  },
  async getList() {
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
