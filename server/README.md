# 项目准备
## 项目介绍
技术栈express + typeorm + mysql

该项目提供了Get、Post、Put、Delete 接口方法， 另外提供了jsonp接口，供用于学习
## 安装Mysql
可以使用phpstudy https://www.xp.cn/ 快速安装Mysql


## 安装依赖
```
npm install
```
## 启动项目
```
npm start
```
## 项目配置
对data-source.ts文件进行配置mysql，默认你只需要更改如下内容:
```
username: "用户名"
password: "密码"
database: "数据库"
```
如果你对数据库等内容不是很了解， 建议将它们都设置成rootroot，因为这是默认值

## 谨慎

1. 在/src/data-source.ts文件中，请在第一次运行的时候将<code>synchronize=true</code>

 **请让它在第一次运行的时候设置成true，之后立马恢复默认值，因为它会导致数据库的id变为空值，目前无法解决。第一次设置true是为了同步数据库建立表格，之后不希望再同步了，故一定要设置false了**

```js
import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "rootrootroot",
  password: "rootrootroot",
  database: "rootrootroot",
  synchronize: false, //
  logging: false,
  entities: [__dirname + "/entity/*{.js,.ts}"],
  migrations: [],
  subscribers: [],
  cache: true
})
```



# 接口文档
## 获取全部用户

**请求URL： http://127.0.0.1:9090/users** 

**请求方法：GET**

**参数：无**

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| users      | array  | 用户集合 |

**返回成功示例**

```json
{
    "statusCode": 200,
    "users": [
        {
            "id": "22c7c08b-1ec7-425a-95c0-e7a429be4518",
            "username": "吴亦凡",
            "password": "12ddd345",
            "email": "ccssssssx@qq.com",
            "status": "1",
            "createdDate": "2023-06-12T11:36:35.732Z"
        }
    ]
}
```



## 获取单独用户信息

**请求URL： http://127.0.0.1:9090/user/{id}** 

**请求方法：GET**

**参数：无**

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| user       | object | 用户数据 |

**异常返回参数**

| 类型       | 参数   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| error      | string | 失败信息 |

**成功返回示例**

```json
{
    "statusCode": 200,
    "user": {
        "id": "11cbfeeb-039a-46b9-ac9d-cc8a43dca969",
        "username": "韩立",
        "email": "22392xa6x8a289@qq.com",
        "status": "1",
        "createdDate": "2023-06-15T07:58:34.434Z"
    }
}
```



## 添加用户

**请求URL： http://127.0.0.1:9090/user/create** 

**请求方法：POST**

**请求参数**

| 参数     | 类型   | 说明                     | 必须 |
| -------- | ------ | ------------------------ | ---- |
| username | string | 用户名(不可为空)         | 是   |
| password | string | 密码(不可为空)           | 是   |
| email    | string | 邮箱(不可为空、不可重复) | 是   |

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| message    | string | 成功信息 |

**异常返回参数**

| 类型       | 参数   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| error      | string | 失败信息 |

**成功返回示例**

```json
{
    "statusCode": 201,
    "message": "已创建"
}
```



## 更新用户

**请求URL： http://127.0.0.1:9090/user/{id}**

**请求方法：PUT**

**路径参数**

| 参数 | 类型   | 说明         | 是否必须 |
| ---- | ------ | ------------ | -------- |
| id   | string | 用户唯一标识 | 是       |

**请求体参数**

| 参数     | 类型   | 说明                 | 是否必须 |
| -------- | ------ | -------------------- | -------- |
| username | string | 用户名(可选)         | 否       |
| password | string | 密码(可选)           | 否       |
| email    | string | 邮箱(可选、不可重复) | 否       |

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| message    | string | 成功信息 |

**异常返回参数**

| 类型       | 参数   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| error      | string | 失败信息 |

<strong>成功返回示例</strong>
```json
{
    "statusCode": 204,
    "message": "更新成功"
}
```



## 删除用户

**请求URL： http://127.0.0.1:9090/user/{id}**

**请求方法：DELETE**

**路径参数**

| 参数 | 类型   | 说明         | 是否必须 |
| ---- | ------ | ------------ | -------- |
| id   | string | 用户唯一的id | 是       |

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| message    | string | 成功信息 |

**异常返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| error      | string | 失败信息 |

<strong>成功返回示例</strong>
```json
{
    "status": 200,
    "message": "已删除"
}
```



## 登录接口

**请求URL： http://127.0.0.1:9090/user/login**

**请求方法：POST**

**请求参数**

| 参数     | 类型   | 说明             | 是否必须 |
| -------- | ------ | ---------------- | -------- |
| email    | string | 邮箱是唯一的账号 | 是       |
| password | string | 密码             | 是       |

**成功返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| message    | string | 成功信息 |

**异常返回参数**

| 参数       | 类型   | 说明     |
| ---------- | ------ | -------- |
| statusCode | number | 状态码   |
| error      | string | 失败信息 |

<strong>成功返回示例</strong>

```json
  status: 1,
  message: "登录成功",
  token: "Bear"
```



## JSONP接口 

**请求URL： http://127.0.0.1:9090/jsonp?callback=handler**

**请求方法：GET**

**路径参数**

| 参数     | 类型   | 说明                                  |
| -------- | ------ | ------------------------------------- |
| callback | string | 回调函数，请在前端提前声明handler函数 |

**成功返回参数**

| 参数  | 类型  | 说明     |
| ----- | ----- | -------- |
| users | array | 用户集合 |