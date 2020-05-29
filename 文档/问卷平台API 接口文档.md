# 1. 问卷平台后台 API 接口文档

## 1.1.  接口说明

- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status Code 标识状态
- 数据返回格式统一使用 JSON

### 1.1.1. 请求方法

- POST

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                                              |
| -------- | --------------------- | --------------------------------------------------- |
| 200      | OK                    | 请求成功                                            |
| 201      | CREATED               | 创建成功                                            |
| 204      | DELETED               | 删除成功                                            |
| 400      | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                |
| 401      | UNAUTHORIZED          | 未授权                                              |
| 403      | FORBIDDEN             | 被禁止访问                                          |
| 404      | NOT FOUND             | 请求的资源不存在                                    |
| 422      | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500      | INTERNAL SERVER ERROR | 内部错误                                            |

------

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：login
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注            |
| ------ | -------- | --------------- |
| token  | 令牌     | 基于 jwt 的令牌 |

- 响应数据

```json
{
    "data": {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
```

## 1.3. 问卷管理

### 1.3.1. 获取问卷信息列表

- 请求路径：getQuestionaireInfo
- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| userName | 用户名   | 不能为空 |


- 响应参数

| 参数名   | 参数说明 | 备注                                             |
| -------- | -------- | ------------------------------------------------ |
| title    | 问卷名   |                                                  |
| status   | 发布状态 | 如果状态是已发布，会跟据截止时间调整状态为已发布 |
| deadline | 截止时间 |                                                  |


- 响应数据

```json
{
    "data": {
        "questionaires": [
            {
                "title": "",
                "status": "",
                "deadline": "",
            }
        ]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 1.3.2. 发布一个问卷

- 描述：改变后台发布状态（status）为未发布

- 请求路径：publish
- 请求参数

| 参数名   | 参数说明         | 备注 |
| -------- | ---------------- | ---- |
| userName | 用户名           |      |
| index    | 对应问卷数组索引 |      |


- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |


- 响应数据

```json
{
    "data": {
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 1.3.2. 停止发布问卷

- 描述：改变后台发布状态（status）为已发布

- 请求路径：stopPublish
- 请求参数

| 参数名   | 参数说明         | 备注 |
| -------- | ---------------- | ---- |
| userName | 用户名           |      |
| index    | 对应问卷数组索引 |      |


- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |


- 响应数据

```json
{
    "data": {
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 1.3.2. 删除问卷

- 根据索引跟用户名对questionnaires进行数组删除

- 请求路径：deleteQuestionaire

- 请求参数

| 参数名   | 参数说明         | 备注 |
| -------- | ---------------- | ---- |
| userName | 用户名           |      |
| index    | 对应问卷数组索引 |      |


- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |


- 响应数据

```json
{
    "data": {
    },
    "meta": {
        "msg": "获取成功",
        "status": 204
    }
}
```

### 1.3.2. 新建问卷

- 根据用户名在questionnaires头部进行数组插入，不进行数据响应直接在前端储存最开始的模板，后端也同时进行模板保存

- 请求路径：createQuestionaire
- 请求参数

| 参数名   | 参数说明 | 备注 |
| -------- | -------- | ---- |
| userName | 用户名   |      |


- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |


- 响应数据

```json
{
    "data": {
  }
    },
    "meta": {
        "msg": "获取成功",
        "status": 201
    }
}
```

### 1.3.2. 获取一个问卷

- 根据用户名和索引获取questionnaires[index]

- 请求路径：getQuestionnaire

- 请求参数

| 参数名   | 参数说明         | 备注 |
| -------- | ---------------- | ---- |
| userName | 用户名           |      |
| index    | 对应问卷数组索引 |      |


- 响应参数

| 参数名        | 参数说明                           | 备注 |
| ------------- | ---------------------------------- | ---- |
| questionnaire | questionnaires[index],一个json对象 |      |
| title         | 问卷标题                           |      |
| questions     | 问卷里的问题                       |      |
| type          | 题目类型（三种）                   |      |
| question      | 问题内容                           |      |
| choices       | 选项内容                           |      |


- 响应数据

```json
{
    "data": {
        "questionnaire":{
    "title": "",
    "questions": [
      {
        "type": "",
        "question": ""
      },
      {
        "type": "radio",
        "question": "",
        "choices": [
        ]
      },
      {
        "type": "",
        "question": "",
        "choices": [
        ]
      }]
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 1.3.2. 保存（更新）问卷

- 根据用户名和索引保存questionnaires[index]（合并JSON对象）

- 请求路径：saveQuestionaire
- 请求参数

| 参数名        | 参数说明           | 备注 |
| ------------- | ------------------ | ---- |
| userName      | 用户名             |      |
| index         | 对应问卷数组索引   |      |
| questionnaire | 具体是一个json对象 |      |

```json
{
    "userName":"",
    "index":0,
    "questionnaire":{
    "title": "",
    "questions": [
      {
        "type": "",
        "question": ""
      },
      {
        "type": "radio",
        "question": "",
        "choices": [
        ]
      },
      {
        "type": "",
        "question": "",
        "choices": [
        ]
      }]
    }
}
```



- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |


- 响应数据

```json
{
    "data": {
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

## 1.4. 答卷管理

### 1.4.1. 提交一份答卷

- 请求路径：submitAnswer
- 请求参数

| 参数名   | 参数说明                             | 备注 |
| -------- | ------------------------------------ | ---- |
| userName | 用户名（注意是问卷拥有者）           |      |
| index    | 对应问卷数组索引                     |      |
| answers  | 答案对象（内含答案数组，可进行合并） |      |

```json
{
    "userName":"",
    "index":0,
    "answers":
    {
    "questions": [
      {
        answer:[]
      },
      {
        answer:[]
      }
      ]
    }
}
```

- 响应参数

| 参数名 | 参数说明 | 备注 |
| ------ | -------- | ---- |
|        |          |      |

- 响应数据

```json
{
    "data": {
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```

### 1.4.2. 获取所有答卷

- 请求路径：getAnswer
- 请求参数

| 参数名   | 参数说明         | 备注 |
| -------- | ---------------- | ---- |
| userName | 用户名           |      |
| index    | 对应问卷数组索引 |      |

- 响应参数

| 参数名        | 参数说明                           | 备注 |
| ------------- | ---------------------------------- | ---- |
| questionnaire | questionnaires[index],一个json对象 |      |
| title         | 问卷标题                           |      |
| questions     | 问卷里的问题                       |      |
| type          | 题目类型（三种）                   |      |
| question      | 问题内容                           |      |
| choices       | 选项内容                           |      |
| answer        | 调研用户答案内容                   |      |

- 响应数据

```json
{
    "data": {
        "questionnaire":{
    "title": "问卷标题",
    "questions": [
      {
        "type": "input",
        "question": "单行输入问题",
        "answer": [
        ]
      },
      {
        "type": "radio",
        "question": "单行输入问题",
        "choices": [
        ],
        "answer": [
        ]
      },
      {
        "type": "checkbox",
        "question": "单行输入问题",
        "choices": [
        ],
        "answer": [
        ]
      }
    ]
  }
    },
    "meta": {
        "msg": "获取成功",
        "status": 200
    }
}
```
