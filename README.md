# vue-calendar-picker-mobile

基于 Vue 的移动版日期选择组件

## 使用方式

### 安装

`npm install vue-calendar-picker-mobile --save`

### 使用

```javascript

//引入并安装

import { CalendarRange, Calendar,CalendarBase } from "vue-calendar-picker-mobile"

Vue.use(CalendarBase) //基础组件
Vue.use(Calendar) //单选组件
Vue.use(CalendarRange)//多选组件


//页面中使用
<calendar-base v-model="basedate"></calendar-base>

<calendar v-model="singledate"></calendar>

<calendar-range v-model="daterange"></calendar-range>

```

### 相关属性

| 参数              | 说明                         | 类型                  | 可选值                 | 默认值     | 适用组件       |
| ----------------- | ---------------------------- | --------------------- | ---------------------- | ---------- | -------------- |
| value / v-model   | 绑定值                       | Array(日期数组), Date | -                      | -          | 所有           |
| format            | 日期格式                     | String                | 参考`moment`库日期格式 | YYYY-MM-DD | 所有           |
| placeholder       | 非范围选择时的占位内容       | String                | -                      | 选择日期   | calendar       |
| start-placeholder | 范围选择时开始日期的占位内容 | String                | -                      | 开始日期   | calendar-range |
| end-placeholder   | 范围选择时结束日期的占位内容 | String                | -                      | 结束日期   | calendar-range |
| range-separator   | 选择范围时的分隔符           | String                | -                      | 至         | calendar-range |

### 事件

| 事件名 | 说明                   | 参数                 |
| ------ | ---------------------- | -------------------- |
| change | 用户确认选定的值时触发 | 组件绑定值,Date 类型 |
