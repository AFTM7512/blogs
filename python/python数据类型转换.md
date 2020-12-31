> 如有错误，敬请斧正。

## 转换为数字
### `int`
> int() 函数用于将一个字符串或数字转换为整型。
#### 参数
1. `x` -- 字符串或数字。
2. `base` -- 进制数，默认十进制。
```py
>>> int(1.0) 
1   
>>> int('1.1') 
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: '1.1'
>>> int(123)
123 
>>> int('123')
123 
>>> int('123.1') 
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: '123.1'
>>> int('a') 
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: 'a'
>>> int('1222ddd') 
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: invalid literal for int() with base 10: '1222ddd'
>>>
```
#### 总结：
字符串 str 转换成整形 int 中，只能包含数字，不能有其他的。
如果是浮点类型的字符串，可使用 float 。

### `float`
> float() 函数用于将整数和字符串转换成浮点数。
#### 参数
* x -- 整数或字符串
```py
>>> float(10) 
10.0
>>> float(10.00) 
10.0
>>> float('10.1') 
10.1
>>> float('10')
10.0
>>> float('10aaa')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: could not convert string to float: '10aaa'
>>>
```

## 转换为字符串
### `str`
> 函数将对象转化为字符串。
#### 语法
`class str(object='')`
#### 参数
object -- 对象。
```py
>>> str(123)
'123'
>>> str({ "key": 123, "str": "abc" })
"{'key': 123, 'str': 'abc'}"
>>> str([ 1, 2, 3 ])
'[1, 2, 3]'
>>> str(('a', 'b', 'c'))
"('a', 'b', 'c')"
>>> str({ 'a', 'b', 'c' })
"{'a', 'c', 'b'}"
>>>
```
## 转换为元素
### `tuple`
> tuple 函数将可迭代系列（如列表）转换为元组。
#### 语法
`tuple( iterable )`
#### 参数
* `iterable` -- 要转换为元组的可迭代序列。
```py
>>> tuple(['a', 'b', 'c'])
('a', 'b', 'c')
>>> tuple('abc')
('a', 'b', 'c')
>>>
```
## 转换为列表
### `list`
> list() 方法用于将元组或字符串转换为列表。

#### 语法
`list( seq )`
#### 参数
* `seq` -- 要转换为列表的元组或字符串。
```py
>>> list('abc') 
['a', 'b', 'c']
>>> list('123')
['1', '2', '3']
>>> list((1, 2, 3))
[1, 2, 3]
>>> list(('a'))
['a']
>>>  
```
## 转换为字典

## 转换为集合
### `set()`
> set() 函数创建一个无序不重复元素集，可进行关系测试，删除重复数据，还可以计算交集、差集、并集等。
#### 语法
`class set([iterable])`
#### 参数
* iterable -- 可迭代对象对象；
```py
>>> set('abc')
{'b', 'a', 'c'}
>>> set(('a', 'b'))
{'b', 'a'}
>>> set(['a', 'b', 'c'])
{'b', 'a', 'c'}
>>> x = set('runoob')
>>> y = set('google')  
>>> x | y
{'e', 'b', 'n', 'g', 'r', 'o', 'l', 'u'}
>>> x & y
{'o'}
>>> x - y
{'b', 'n', 'r', 'u'}
>>>
```