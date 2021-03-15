
## `CREATE TABLE`
### 基本语法
`CREATE TABLE table_name (column_name column_type);`
### 示例
```sql
CREATE TABLE IF NOT EXISTS `runoob_tbl`(
   `runoob_id` INT UNSIGNED AUTO_INCREMENT,
   `runoob_title` VARCHAR(100) NOT NULL,
   `runoob_author` VARCHAR(40) NOT NULL,
   `submission_date` DATE,
   PRIMARY KEY ( `runoob_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
1. 如果你不想字段为 NULL 可以设置字段的属性为 NOT NULL， 在操作数据库时如果输入该字段的数据为NULL ，就会报错。
2. AUTO_INCREMENT定义列为自增的属性，一般用于主键，数值会自动加1。
3. PRIMARY KEY关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。
4. ENGINE 设置存储引擎，CHARSET 设置编码。


## `SELECT`
### 基础语法
```sql
SELECT 
    column1,[column2],...
FROM 
    table
[WHERE Clause]
[LIMIT N][ OFFSET M];
```
1. SELECT:指定要返回的列。
2. FROM:指定要查询的表。
3. WHERE:设定查询结果的过滤条件。
4. LIMIT:设定返回记录的行数。
5. OFFSET:指定开始查询的数据偏移量，默认为0。
6. limit N,M: 相当于limit M offset N, 从第 N+1 条记录开始, 返回 M 条记录。
7. SELECT和FROM语句是必须的，其他部分是可选的。

## `INSERT`
将一行或多行数据插入到表中。
### 语法
```sql
INSERT INTO 
    table ( column1, column2,...columnN )
VALUES
    ( value1, value2,...valueN );
```

### 排序
1. 可以设定多个字段来排序。
2. 可以使用ASC或DESC关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列
```sql
SELECT 
    column1,[column2],...
FROM 
    table
ORDER BY 
    column1 [ASC [DESC]], [column2] [ASC [DESC]],...;
```
### 去重
```sql
SELECT DISTINCT
    column1,[column2],...
FROM
    table;
```


## `UPDATE`
更改表中单个行，一组行或所有行的列值。
```sql
UPDATE 
    table 
SET 
    column1 = value1,
    column2 = value2,
    ...
[WHERE Clause];
```
> 如果省略`WHERE`子句，则`UPDATE`语句将更新表中的所有行。

## `DELETE`
删除 `MySQL` 数据表中的数据。但实际中一般使用软删除，通过`where`过滤标志为已删除的数据。
```sql
DELETE FROM 
    table 
[WHERE Clause]
```