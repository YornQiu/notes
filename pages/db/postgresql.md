# PostgreSQL

## 基础命令

### 用户管理

1. 创建用户

```sql
CREATE USER username WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE db_name TO username;
```

2. 修改密码

```sql
ALTER USER username WITH PASSWORD 'new_password';
```

3. 查看用户（psql）

```sql
\du
```

### 数据库操作

- 创建数据库：

```sql
CREATE DATABASE db_name;
```

- 列出数据库（psql）：

```sql
\l
```

- 删除数据库：

```sql
DROP DATABASE db_name;
```

- 连接数据库：

```bash
psql -U user -d db_name
```

### 表与查询

- 创建表：

```sql
CREATE TABLE tb_name (id SERIAL PRIMARY KEY, col VARCHAR(100));
```

- 列出表（psql）：

```sql
\dt
```

- 查看表结构：

```sql
\d tb_name
```

- 查询：

```sql
SELECT * FROM tb_name;
```

- 删除表：

```sql
DROP TABLE tb_name;
```

## 备份与恢复

- 备份（单库）：

```bash
pg_dump -U user -d db_name -F c -f db_name.dump
```

- 恢复（单库）：

```bash
pg_restore -U user -d db_name db_name.dump
```

- 备份（全库/全局）:

```bash
pg_dumpall -U user > all_databases.sql
```

- 恢复（全库/全局）:

```bash
psql -U user -f all_databases.sql
```

## 重置自增 ID

1. 重置自增主键

```sql
TRUNCATE table_name RESTART IDENTITY;
```

2. 重置为指定值

```sql
ALTER SEQUENCE table_id_seq RESTART WITH 1;
```

3. 查看当前序列

```sql
SELECT nextval('table_id_seq');
```

4. 重置为当前表中最大值

```sql
SELECT setval('table_id_seq', max(id)) from table_name;
```
