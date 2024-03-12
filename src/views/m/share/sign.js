// import { hex_sha1 } from '../plugins/sha1.js' //签名
import sha1 from "sha1";

export default function (data) {
    var urlN = window.location.href.split('#')[0]
    var timestampn = new Date().getTime().toString()
    var timestamp = timestampn.substring(0, 10) //生成签名的时间戳
    var nonceStr = Math.random().toString(36).substr(2) //生成签名的随机串
    var con = `jsapi_ticket=${data.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${urlN}`
    var signature = sha1(con) //签名
    //签名处理后参数
    return {
        appId: 'wxa039b9f506b604a7',
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature
    }
}
