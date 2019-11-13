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
});

// 显示成功提示
const showError = text => wx.showToast({
  title: text,
  icon: 'none',
  duration: 1000,
});

// 显示失败提示
const showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false,
  });
};

export {
  hideToast, showBusy, showSuccess, showError, showModel,
};
