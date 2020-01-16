// 消除提示
const hideToast = () => wx.hideToast();

// 显示繁忙提示
const showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  mask: true,
  duration: 10000,
});

// 显示成功提示
const showSuccess = text => wx.showToast({
  title: text,
  icon: 'success',
  duration: 2000,
});

// 显示成功提示, 延迟执行回调
const showSuccessSync = (text, callback) => wx.showToast({
  title: text,
  icon: 'success',
  duration: 2000,
  success: () => {
    setTimeout(() => {
      callback();
    }, 2000);
  },
});

// 显示失败提示
const showError = text => wx.showToast({
  title: text,
  icon: 'none',
  duration: 2000,
});

// 显示失败弹框
const showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
  });
};

export {
  hideToast,
  showBusy,
  showSuccess,
  showError,
  showModel,
  showSuccessSync,
};
