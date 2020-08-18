import request from '@/utils/request';
import { format } from '@/utils/date';

Page({
  data: {
    isDone: false,
    iPhone: false,
    detail: {},
    taskId: null,
  },
  async onLoad({ task_id }) {
    const data = await request('/api/xrm/task/detail', { params: { task_id } });
    // 判断今日是否已打卡
    if (data && data.last_submit_date) {
      const timestamp = Number(new Date()).toString().slice(0, 10);
      if (Number(format('YYYYMMDD', timestamp)) === data.last_submit_date) {
        this.setData({ isDone: true });
      }
    }

    this.setData({ detail: data, taskId: task_id });

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
  async touchDaka(e) {
    const { id } = e.currentTarget.dataset;
    const { taskId } = this.data;

    const result = await request('/api/xrm/task/submit', { type: 'POST', params: { task_id: id } });
    if (result) {
      const data = await request('/api/xrm/task/detail', { params: { task_id: taskId } });
      this.setData({ isDone: true, detail: data });
    }
  },
});
