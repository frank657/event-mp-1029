// app.js
import event from '@codesmiths/event';

App({
  onLaunch() {
    const that = this;

    // 登录
    wx.login({
      success(res) {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${that.getUrl()}/login`,
          method: 'POST',
          data: { code: res.code },
          success(loginRes) {
            console.log('login res', loginRes);
            that.globalData.user = loginRes.data.user;
            that.globalData.header = loginRes.header['Authorization']
            console.log('get header here', that.getHeader());
            event.emit('tokenReady')
          }
        })
      }
    })
  },

  getUrl() {
    return this.globalData.baseUrl;
  },
 
  getHeader() {
    return this.globalData.header;
  },

  globalData: {
    userInfo: null,
    baseUrl: 'http://localhost:3000/api/v1'
  }
})
