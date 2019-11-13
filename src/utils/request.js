import { showError } from './toast';
import login from '@/service/login';
import config from '@/config';

const defaultHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};

/**
 * @description 补充请求次数的参数callTimes
 * @param url
 * @param type
 * @param params
 * @param callTimes
 * @return {Promise}
 */
const request = (url, { type = 'GET', params = {} } = {}, callTimes = 1) => {
  // 记录本次调用个数
  let calleeTimes = callTimes;
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.host}${url}`,
      method: type,
      data: { ...params },
      header: {
        ...defaultHeader,
        Cookie: `WX_USS=${wx.getStorageSync('SESSION_USS')}`,
      },
      success(res) {
        if (res.data.errno === 0) {
          resolve(res.data.data);
        } else {
          switch (res.data.errno) {
            case 110003:
            case 330000:
              // 超过5次不再重新登录
              calleeTimes += 1;
              if (calleeTimes < 5) {
                // 登录并重发请求
                login(() => resolve(request(url, { type, params }, calleeTimes)));
                wx.hideNavigationBarLoading();
              } else {
                reject(res.data);
              }
              break;
            default:
              reject(res.data);
              showError(`${res.data.errmsg || '系统错误'}`);
              break;
          }
        }
      },
      fail(err) {
        reject(err);
      },
    });
  });
};

export default request;
