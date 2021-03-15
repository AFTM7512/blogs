## 分页

### `limit` 基本实现
> 数量级较小时(百/千)
```sql
# 收到客户端{ page: 1, pageSize: 10 }
select * from table limit (page - 1) * pageSize, pageSize;
```

### 建立主键或者唯一索引
> 在数据量较小的时候简单的使用 limit 进行数据分页在性能上面不会有明显的缓慢，但是数据量达到了 万级到百万级 sql语句的性能将会影响数据的返回。这时需要利用主键或者唯一索引进行数据分页；
```sql
# 假设主键或者唯一索引为 id
# 收到客户端{ page: 5, pageSize: 10 }
select * from table where id > (page - 1)* pageSize limit pageSize;
```