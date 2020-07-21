import login from '@/service/login';

Page({
  onShareAppMessage() {
    return {
      title: '跟我一起成为打卡超人吧！',
      path: '/pages/index/index',
    };
  },
  async goLogin() {
    const res = await login();
    console.log(res);
  },
});
