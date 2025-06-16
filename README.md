# FE Helper Plus README

This is the README for vscode extension "FE Helper Plus".

## Features

### JSON -> TS Type Constraints

#### Introduction
1. The underlying conversion capability relies on [json-to-ts](https://www.npmjs.com/package/json-to-ts), and the naming logic for types has been optimized slightly (with an "upper camel case" naming rule built in).
2. Friendly preset keyboard shortcuts.
3. Support for right-click menu.
4. Field names support "camel case" and "underscore" styles.
5. Type names default to "upper camel case".
6. High reliability and security, no content will be recorded or reported.

#### Usage
1. Select the JSON string that needs to be converted (or copy the content), right-click to bring up the menu and click the corresponding button, which will automatically generate TS type constraints (supporting conversion to camel case or underscore).

![json2ts1](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dfea51255c2b4935a421e84c5bb8d7c9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=kEVhyp6J%2Bfti9u1aFC2qCjQch8M%3D)

2. Select the JSON string that needs to be converted (or copy the content), use the keyboard shortcut as shown in the figure below, which will automatically generate TS type constraints (supporting conversion to camel case or underscore).

![json2ts2](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/42ba55c9150c4652ab8c1ffcdc202e45~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=8Dbh1f0PhFnlDpGOwXUxTYCCh8w%3D)

### Multi-language JSON file <-> Excel file

#### Introduction
1. Support for mutual conversion between multi-language JSON file and Excel file.
2. Flattened and non-flattened JSON: The underlying dependency is [flat](https://www.npmjs.com/package/flat), and the format of Json Key in Excel must be in the format of ".n.".

#### Usage
1. Select the JSON or Excel file that needs to be converted in the editor's explorer, right-click to bring up the menu and click the corresponding button, which will automatically generate the corresponding Json file or Excel file. The main use case is the mutual conversion of multi-language JSON packages and Excel file. If a folder is selected, it will batch convert the JSON or Excel file in its children levels.

![json2excel](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7984d40520eb43568836e42fb4a32658~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=QpHId4jt22rwfeSwn6cLsgLx79g%3D)

### One-Click Installation of Essential VS Code Extensions for Front-End Development

#### Introduction
1. One-click installation of essential VS Code extensions for front-end development.
2. Supports custom selection of extensions to install.
3. Automatically skips extensions that are already installed during installation.

#### Usage
1. Supported by right-click menu or shortcut key activation.

![install](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b4288572d7be4994b7fc4e1fe46a1e71~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743312447&x-signature=oFdd3RqezyKRALy3X%2F27mp2mOwE%3D)

![install](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2da532ad318448c882a795575a00ef35~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743312447&x-signature=eSYQjEHs8xNxZEDId3XCm9Hhmzs%3D)

### ...... (Stay tuned)

## Requirements

VsCode Version: Greater than or equal to 1.98.0

## Extension Settings

This extension contributes the following settings:

### Open AI Configuration
- `fe-helper-plus.openAI.baseUrl`: Open AI API URL (KIMI model by default)
- `fe-helper-plus.openAI.apiKey`: Open AI API Key
- `fe-helper-plus.openAI.model`: Open AI Model Name

### JSON to TS Configuration
- `fe-helper-plus.json2ts.useAI`: Enable/disable AI-powered conversion
- `fe-helper-plus.json2ts.useStream`: Enable/disable stream output when AI conversion is enabled

**Enjoy!**

<br/>

# FE Helper Plus README

这是Vscode扩展“FE Helper Plus”的简介。

## 功能

### JSON -> TS 类型约束

#### 简介
1. 底层转换能力依赖于 [json-to-ts](https://www.npmjs.com/package/json-to-ts)，并对类型的命名逻辑进行了些许优化（内置了“大驼峰”命名规则）。
2. 友好的快捷键预设。
3. 支持右键菜单。
4. 字段名称支持“小驼峰”和“下划线”风格。
5. 类型名称默认使用“大驼峰”。
6. 高可靠性和安全性，不会记录或上报任何内容。

#### 使用方法
1. 选中需要转换的 JSON 字符串（或复制该内容），右键唤起菜单并点击对应按钮，将自动生成 TS 类型约束（支持转为小驼峰或下划线）。

![json2ts1](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/dfea51255c2b4935a421e84c5bb8d7c9~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=kEVhyp6J%2Bfti9u1aFC2qCjQch8M%3D)

2. 选中需要转换的 JSON 字符串（或复制该内容），使用下图所示的快捷键，将自动生成 TS 类型约束（支持转为小驼峰或下划线）。

![json2ts2](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/42ba55c9150c4652ab8c1ffcdc202e45~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=8Dbh1f0PhFnlDpGOwXUxTYCCh8w%3D)

### 多语言 JSON 文件 <-> Excel 文件

#### 简介
1. 支持多语言 JSON 文件与 Excel 文件之间的相互转换。
2. 扁平化和非扁平化 JSON：底层依赖 [flat](https://www.npmjs.com/package/flat)，Excel 中的 Json Key 格式必须为 ".n."。

#### 使用方法
1. 在编辑器的资源管理器中选择需要转换的 JSON 或 Excel 文件，右键唤起菜单并点击对应按钮，将自动生成对应的 Json 文件或 Excel 文件。主要使用场景是多语言 JSON 包与 Excel 文件之间的相互转换。如果选择的是文件夹，将批量转换其子层级中的 JSON 或 Excel 文件。

![json2excel](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/7984d40520eb43568836e42fb4a32658~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743261787&x-signature=QpHId4jt22rwfeSwn6cLsgLx79g%3D)

### 一键安装前端开发必备vscode插件

#### 简介
1. 一键安装前端开发必备vscode插件。
2. 支持自定义选择需要安装的插件。
3. 安装时会自动忽略已安装的插件。

#### 使用方法
1. 支持右键菜单或者快捷键唤起。

![install](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/b4288572d7be4994b7fc4e1fe46a1e71~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743312447&x-signature=oFdd3RqezyKRALy3X%2F27mp2mOwE%3D)

![install](https://p3-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/2da532ad318448c882a795575a00ef35~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg57un57ut5Yqq5Yqb5bCx5aW9:q75.awebp?rk3s=f64ab15b&x-expires=1743312447&x-signature=eSYQjEHs8xNxZEDId3XCm9Hhmzs%3D)

### ......（敬请期待）

## 要求

VsCode 版本：大于等于 1.98.0

## 扩展设置

本扩展提供了以下设置：

### Open AI 配置
- `fe-helper-plus.openAI.baseUrl`：Open AI 接口 URL（默认使用Kimi大模型）
- `fe-helper-plus.openAI.apiKey`：Open AI 接口 密钥
- `fe-helper-plus.openAI.model`：Open AI 接口 模型

### JSON 转 TS 配置
- `fe-helper-plus.json2ts.useAI`：是否开启AI转化
- `fe-helper-plus.json2ts.useStream`：开启AI转化后，是否使用stream流式输出

**欢迎使用！**
