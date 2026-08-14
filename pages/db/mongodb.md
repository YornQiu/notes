# 基础命令

## 用户管理

1. 创建用户

```js
use admin
db.createUser({ user: "root", pwd: "root", roles: [{ role: "root", db: "admin" }] })
```

2. 修改密码

```js
use admin
db.changeUserPassword("root", "new_password")
```

3. 查看用户

```js
use admin
db.getUsers()
```

4. 认证

```js
db.auth("user", "password")
```

## 数据库操作

- 显示数据库：

```js
show dbs
```
- 切换/创建数据库：

```js
use dbname
```
- 当前数据库名：

```js
db.getName()
```
- 删除数据库：

```js
db.dropDatabase()
```

## 集合操作

- 创建集合：

```js
db.createCollection("col_name")
```
- 插入文档（同时创建集合）：

```js
db.col_name.insertOne({ key: "value" })
```
- 查询：

```js
db.col_name.find().pretty()
```
- 显示集合：

```js
show collections
```
- 集合索引：

```js
db.col_name.getIndexes()
```
- 删除集合：

```js
db.col_name.drop()
```

## 备份与恢复

- 备份（导出）：

```bash
mongodump --db dbname --out dump/
```
- 恢复（导入）：

```bash
mongorestore --db dbname dump/dbname
```
