import { showSuccessSync, showError } from '@/utils/toast';
import request from '@/utils/request';

Page({
  data: {
    remind: false,
    showTimePicker: false,
    timeText: '',
    time: [0, 0],
    uploadImg: '',
    selectedIcon: '1',
    name: '',
    isEdit: false,
    taskId: null,
  },
  async onLoad(options) {
    if (options.id) {
      wx.setNavigationBarTitle({ title: '编辑打卡' });
      this.setData({
        isEdit: true,
        taskId: options.id,
      });
      const data = await request('/api/xrm/task/detail', { params: { task_id: options.id } });
      if (data) {
        this.setData({
          name: data.task_name,
          selectedIcon: data.task_pic.toString(),
        });
      }
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
    // wx.chooseImage({
    //   count: 1,
    //   sourceType: ['album', 'camera'],
    //   success: (res) => {
    //     this.setData({ uploadImg: res.tempFilePaths, selectedIcon: '' });
    //   },
    // });
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
    this.setData({ selectedIcon: '1', uploadImg: '' });
  },
  changeName(e) {
    this.setData({ name: e.detail.value });
  },
  clearName() {
    this.setData({ name: '' });
  },
  async finishDaka() {
    const {
      isEdit,
      name,
      remind,
      timeText,
      selectedIcon,
      taskId,
    } = this.data;
    if (name === '') {
      showError('请填写打卡名称');
      return;
    }
    if (remind && timeText === '') {
      showError('请选择提醒时间');
      return;
    }
    let result;
    if (isEdit) {
      result = await request('/api/xrm/task/update', {
        type: 'POST',
        params: {
          task_id: taskId,
          task_name: name,
          task_pic: Number(selectedIcon),
        },
      });
    } else {
      result = await request('/api/xrm/task/add', {
        type: 'POST',
        params: {
          task_name: name,
          task_pic: Number(selectedIcon),
        },
      });
    }
    if (result) {
      showSuccessSync(isEdit ? '编辑成功' : '创建成功', () => { wx.switchTab({ url: '/pages/index/index' }); });
    }
  },
  deleteDaka() {
    const { taskId } = this.data;
    wx.showModal({
      title: '确认删除该打卡么?',
      confirmColor: '#FA5151',
      cancelColor: '#999999',
      async success(res) {
        if (res.confirm) {
          const result = await request('/api/xrm/task/drop', {
            type: 'POST',
            params: {
              task_id: taskId,
            },
          });
          if (result) {
            showSuccessSync('删除成功', () => { wx.switchTab({ url: '/pages/index/index' }); });
          }
        }
      },
    });
  },
});
