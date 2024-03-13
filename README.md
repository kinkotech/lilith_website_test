# web-vue3
技术栈
vue3 + ts + vite + pinia + sass + UnoCSS + vant 

其中
UnoCSS：
https://alfred-skyblue.github.io/unocss-docs-cn/

vant（unplugin-vue-components 按需引入）
https://vant-contrib.gitee.io/vant/v3/#/zh-CN/quickstart

移动端布局
postcss-px-to-viewport
https://github.com/evrone/postcss-px-to-viewport

竖图暂时需要用这个类vertical-pc

构建相关：
pnpm 版本为 7

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

### 项目说明，因无接口，各种错误提示和弹窗显示，暂用下面逻辑显示（正式开发需修改为接口对应的错误提示和窗口提示内容）
一、活动主页地址：https://test-lilith.kinkotec.cn

1.点击“登录”，显示登录窗口；

1.1 点击登录窗口的“确定”，提示各种错误信息；
1.2 登录成功后，显示头像和昵称，保存token到本地缓存，并拿到好友列表，存到会话存储，以方便测试查看；

2.在活动主页中，点击”立即领取“显示“复制红包序列码”窗口；

3.在活动主页中，点击”立即邀请“，未登录时显示登录窗口，登录后跳转到分享页面；

4.在活动主页中，点击“二维码”和“微信logo”，显示“关注公众号”窗口；

5.如要清除登录态，需删除本地存储的token，和会话存储的friendsList

二、邀请活动地址：https://test-lilith.kinkotec.cn/?isInvitation=true

1.点击“登录”，显示登录窗口；

1.1 点击登录窗口的“确定”，提示各种错误信息；

1.2 登录成功后，显示头像和昵称，保存token到本地缓存，并拿到好友列表，存到会话存储，以方便测试查看；并显示“已预约过游戏”窗口，方便测试查看。

1.2 在该链接下，“立即领取”置灰，体现条件不符合时按钮置灰并不可点击；

1.3 点击“立即邀请”，显示“活动结束”窗口

三、分享地址：https://test-lilith.kinkotec.cn/share

该分享页面引入微信sdk，调用微信分享api实现分享功能。因我们有自己的公众号，因此直接调用了的本公司的接口，获取微信所需的appId，timestamp，nonceStr，signature。
