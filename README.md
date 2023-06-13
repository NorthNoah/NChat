# NChat：React+Express全栈聊天室
### 项目内容：
#### 基于React+Express技术，独立进行前后端开发的开源即时通信聊天室，实现了注册登录、设置头像、实时聊天等模块。
### 技术栈：
#### React+React-router+Express+MongoDB+Socket.io+Axios+Antd+styled-components+emoji-pick-react
### 项目特点：
1. 基于路由拦截+本地存储+token的方式实现前台与后台的登录鉴权模块；
2. 基于Socket.io生成Websocket服务器，实现了文字消息和emoji表情的即时通信；基于MongoDB数据库实现聊天记录持久化；
3. 基于rem+媒体查询实现前台移动端适配；基于scrollIntoView API搭配useRef，实现了聊天窗口滚动显示最新消息，提升用户体验。
