// 定义 logoList 中对象的类型
interface Logo {
    id: string;
    icon: string;
    name: string;
    hrefUrl?: string;
}
  
// 定义 ruleList 中对象的类型
interface Rule {
    text: string;
}
  
import Wx from '@/assets/img/wx.png';
import Dy from '@/assets/img/dy.png';
import Tap from '@/assets/img/tap.png';
import Bilibili from '@/assets/img/bilibili.png';
  
const logoList: Logo[] = [{
    id: '001',
    icon: Wx,
    name: 'wx'
}, {
    id: '002',
    icon: Dy,
    name: 'dy',
    hrefUrl: 'https://www.douyin.com/user/MS4wLjABAAAAvNiUf-jWyStihk35nRZm1nObd8mDYnaD47ywQPl5NPzGL0SQNR8Iwq4t2kvX9j58?previous_page=app_code_link'
}, {
    id: '003',
    icon: Tap,
    name: 'tap',
    hrefUrl: 'https://www.taptap.cn/app/241042'
}, {
    id: '004',
    icon: Bilibili,
    name: 'bilibili',
    hrefUrl: 'https://space.bilibili.com/3493138475780593?spm_id_from=333.337.0.0'
}]
  
const ruleList: Rule[] = [{
    text: '1.活动时间:2024年2月5日11:00至2024年2月14日23:59'
}, {
    text: '2.活动期间内,每成功邀请1位新玩家预约公测,即可获得1次助力。成功邀请3位新玩家预约公测后,即可领取新年限定红包封面（已预约的玩家不计入）'
}, {
    text: '3.红包封面每人仅可领取一次,不可重复领取'
}, {
    text: '4.该红包封面为微信红包封面（非实物）,完成领取条件后复制序列码,打开微信聊天页面-点击右下方“＋”选择红包-点击红包封面-点击右上角添加-粘贴领取序列码即可'
}, {
    text: '5.红包封面有效期：成功领取封面后,可在3个月(自然月)内无限次使用,有效期截止日当天24点前均可使用。超过有效期后,已领取的封面将自动失效,无法再次使用。其中,已发送的红包展示不会受到影响'
}, {
    text: '6.活动期间如出现问题,或对活动流程有疑问,可以保存活动页面中的二维码,前往微信添加“启程福利官-小程”进行咨询'
}, {
    text: '7.本次活动《剑与远征：启程》官方拥有活动最终解释权'
}]
  
export { logoList, ruleList }
  