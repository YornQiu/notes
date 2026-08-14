# MySQL

## 基础命令

### 用户管理

1. 创建用户

```sql
CREATE USER 'username'@'host' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'host' WITH GRANT OPTION;
FLUSH PRIVILEGES;
```

2. 修改密码

```sql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

3. 查看用户

```sql
SELECT User, Host FROM mysql.user;
```

### 数据库操作

- 创建数据库：

```sql
CREATE DATABASE db_name;
```
- 列出数据库：

```sql
SHOW DATABASES;
```
- 删除数据库：

```sql
DROP DATABASE db_name;
```
- 选择数据库：

```sql
USE db_name;
```

### 表与查询

- 创建表：

```sql
CREATE TABLE tb_name (col1 VARCHAR(20), col2 CHAR(1));
```
- 显示表：

```sql
SHOW TABLES;
```
- 表结构：

```sql
DESCRIBE tb_name;
```
- 删除表：

```sql
DROP TABLE tb_name;
```

## 备份与恢复

- 备份（导出）：

```bash
mysqldump -u user -p db_name > db_name.sql
```
- 恢复（导入）：

```bash
mysql -u user -p db_name < db_name.sql
```

## FAQ

1. MySQL 8+ Node.js 连接认证问题

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
FLUSH PRIVILEGES;
```

2. 使用 mysqladmin 修改 root 密码

```bash
mysqladmin -u root -p current_password password new_password
```
