# vue-iconfont-cli
用纯JS把iconfont.cn的图标转换成Vue组件，不依赖字体，支持多色彩

![](https://github.com/zhanghuan88/vue-iconfont-cli/blob/master/images/icons.png?raw=true)

## 特性

1、纯组件，不依赖字体，体积小
<br />
2、支持渲染多色彩图标，支持自定义颜色
<br />
3、自动化生成图标组件

## Step 1
安装插件
```bash
# Npm
npm i @z363416071/vue-iconfont-cli -D
```

# Step 2
生成配置文件
```bash
npx iconfont-init
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
  "symbol_url": "请参考README.md，复制官网提供的JS链接",
  "is_vue2": true,
  "use_typescript": false,
  "local_icon_dir": "",
  "save_dir": "./src/components/iconfont",
  "trim_icon_prefix": "icon",
  "unit": "px",
  "default_icon_size": 18
}
```
### 配置参数说明：
### symbol_url
请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js`

<br />

![](https://github.com/zhanghuan88/vue-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

### is_vue2
是否使用Vue2，默认为true,<font color="#EC3223" size="3">暂时不支持Vue3</font>

### use_typescript
是否使用typescript

### local_icon_dir
本地svg的Icon目录

### save_dir
根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

注意，这个选项只针对 `<Icon />` 组件有效

### unit
图标的单位，默认是网页常用单位`px`即像素，也推荐您在手机网页中使用自适应的`rem`单位。

### default_icon_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入props的方式改变这个size值。

# Step 3
开始生成Vue标准组件
```bash
npx iconfont-h5
```

生成后查看您设置的保存目录中是否含有所有的图标，你可以参考[snapshots目录](https://github.com/iconfont-cli/react-iconfont-cli/tree/master/snapshots)的快照文件，以区分不同模式下的图标结构。

# 使用

只提供了一个引用方式：

使用汇总`ColorsIcon`组件：<font color="#EC3223" size="3">名称会被转为驼峰</font>
```vue
<template>
  <colors-icon name="{{你图标名字}}" />
</template>
```


### 图标尺寸
根据配置`default_icon_size`，每个图标都会有一个默认的尺寸，你可以随时覆盖。也可以使用设置样式覆盖.
```vue
<colors-icon name="alipay" size="20"></colors-icon>
```
![](https://github.com/zhanghuan88/vue-iconfont-cli/blob/master/images/default-color-icon.png?raw=true)
### 图标单色

单色图标，如果不指定颜色值，图标将渲染原本的颜色。如果你想设置为其他的颜色，那么设置一个你想要的颜色即可。
**注意：如果你在props传入的color是字符串而不是数组，那么即使原本是多色彩的图标，也会变成单色图标。同样单色可以设置样式color来设置单色**

```vue
<colors-icon name="alipay" color="green"></colors-icon>
```
![](https://github.com/zhanghuan88/vue-iconfont-cli/blob/master/images/one-color-icon.png?raw=true)

### 图标多色彩
多色彩的图标，如果不指定颜色值，图标将渲染原本的多色彩。如果你想设置为其他的颜色，那么设置一组你想要的颜色即可
```vue
<colors-icon name="alipay" :color="['green', 'orange']"></colors-icon>
```
颜色组的数量以及排序，需要根据当前图标的信息来确定。您需要进入图标组件中查看并得出结论。


![](https://github.com/zhanghuan88/vue-iconfont-cli/blob/master/images/multi-color-icon.png?raw=true)


# 更新图标
当您在iconfont.cn中的图标有变更时，只需更改配置`symbol_url`，然后再次执行`Step 3`即可生成最新的图标组件
```bash
# 修改 symbol_url 配置后执行：
npx iconfont-h5
```
--------

欢迎使用，并给我一些反馈和建议，让这个库做的更好
