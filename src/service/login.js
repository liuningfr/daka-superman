import config from '@/config';

let isLogin = true;
let loginCallback = [];
const loginCall = () => {
  for (let i = 0; i < loginCallback.length; i += 1) {
    if (typeof loginCallback[i] === 'function') {
      loginCallback[i]();
    }
  }
  // 执行完成后清空队列
  loginCallback = [];
};
const login = (callback) => {
  if (!isLogin) {
    loginCallback.push(callback);
  } else {
    isLogin = false;
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: `${config.host}/api/xrm/users/login`,
            method: 'GET',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            data: {
              // app_id: wx.getExtConfigSync().app_id,
              code: res.code,
            },
            success(data) {
              if (data.data.errno === 0) {
                wx.setStorage({
                  key: 'SESSION_USS',
                  data: data.data.data.session_uss,
                  success() {
                    isLogin = true;
                    if (callback) callback();
                    loginCall();
                  },
                });
              }
            },
          });
        }
      },
      fail() {},
    });
  }
};

export default login;
