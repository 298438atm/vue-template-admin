### 项目简介
该项目是使用vue2 + vue-cli + vue-router + vuex + element-ui搭建的vue项目架构
内置了用户管理，菜单管理，角色管理，字典关联等模块，对表格查询，分页，等基础组件进行了二次封装。
支持自定义主题颜色，axios的响应拦截。

### 项目启动事项
1. `npm i` node版本16.19.1
2. `cd service`
3. `node .\index.js`
4. `npm run dev`

### 注意
1. 虽然项目提供了部分接口，但是并没有链接数据库，使用的是json保存本地的方式
2. 接口漏洞比较大，只适合测试使用
3. 账号密码：admin  admin
4. 对于表格组件我感觉有些过度封装了，有问题可以探讨，微信：fjl_code_life