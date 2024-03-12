import wxShare from './wx.js' //微信支付
import wxSign from './sign.js' //处理签名数据
import axios from 'axios'
/**
 * 微信签名
 * @param {Object} params={}
 * @param {String} weixinName
 */
export function getWxSign({ weixinName = 'xdbx-zs' } = {}) {
    return axios.get(`${URI.wx}/api/v1/weixin/get_token`, { params: { weixinName } })
}

export default function (data, signData) {
    //先获取签名
    getWxSign(signData).then((res) => {
        if (res.code == 200) {
            let config = wxSign({ ticket: res.content.ticket, appId: res.content.appid })
            wxShare({
                config: config,
                data: data,
                success: function (res) {
					console.log(res)
				},
                cancel: function (res) {
					console.log(res)
				}
            })
        }
    })
}
