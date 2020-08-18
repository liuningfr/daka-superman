import login from '@/service/login';
import request from '@/utils/request';

Page({
  data: {
    data: {},
  },
  async onLoad() {
    await this.getUserInfo();
  },
  onShareAppMessage() {
    return {
      title: '跟我一起成为打卡超人吧！',
      path: '/pages/index/index',
    };
  },
  async goLogin() {
    await login();
    await this.getUserInfo();
  },
  async getUserInfo() {
    const res = await request('/api/xrm/users/getUserInfo');
    this.setData({ data: res });
  },
});
