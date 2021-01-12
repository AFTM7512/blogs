## 创建一个简单的 http 服务

```js
const { createServer } = require('http')

const server = createServer((req, res) => {
  // 设置请求头
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  // 写入数据
  res.write('hello node.js')

  // 结束响应
  res.end()
})
  .listen(3000, () => {
    console.log('http://localhost:3000');
  })
```

#### 通过上面的例子做一个简单的总结：
1. 需要引入 `http` 模块；
2. 使用 `createServer` 方法创建一个服务器；
3. `createServer` 方法的 `callback` 中的 `req` 为 `request`, `res` 为 `response`,函数通过 request, response 参数来接收和响应数据。

### 上面简单实现了服务器，但是并没有实现路由，请看下面的例子
```js
const { createServer } = require('http')
createServer((req, res) => {
  /**
   * 可以根据 req.url 获取 请求路径，返回的路径是包含 / 在内的字符串；
   * req.method 返回的是请求方法，如 GET
   */
  console.log(req.url, req.method);

  if (req.url === '/' || req.url === '/favicon.ico') {
    res.writeHead(200, {})
  } else if (req.url === '/home') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    // 返回数据
    res.write('hello home')
  } else if (req.url === '/about') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    // 返回数据
    res.write('hello about')
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    // 返回数据
    res.write('hello error')
  }
  // 停止响应
  res.end()
})
  .listen(3000, () => {
    console.log('http://localhost:3000');
  })
```
#### 小总结：
- 我们可以通过 `req.url`  `req.method` 来判断请求的方法和路径。

### 上面的例子中， `req.url` 返回的是包含根路径下的完整路径的字符串，如果包含查询字符串在内的情况，我们还得需要自己解析，不是特别方便。
```js
const { createServer } = require('http')
const querystring = require('querystring')
createServer((req, res) => {
  const [path, searchStr] = req.url.split('?')
  // querystring.parse 解析查询字符串的内容
  const searchObj = querystring.parse(searchStr)
  console.log(path, searchObj);
  if (path === '/' || path === '/favicon.ico') {
    res.writeHead(200, {})
  } else if (path === '/home') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello home')
  } else if (path === '/about') {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello about')
    // 当我们输入 http://localhost:3000/about?id=123 时，此处会有响应
    if (searchObj.id) res.write('\n id' + searchObj.id)
  } else {
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
    res.write('hello error')
  }
  res.end()
})
  .listen(3000, () => {
    console.log('http://localhost:3000');
  })
```
#### 小总结：
- 我们通过 引用 `querystring.parse` 来解析查询字符串，来实现更好处理请求的url。

##### `querystring.parse(str[, sep[, eq[, options]]])`
> querystring.parse() 方法将 URL 查询字符串 str 解析为键值对的集合。
- str <string> 要解析的 URL 查询字符串。
- sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
- eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
- options <Object>
  - decodeURIComponent <Function> 当解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
  - maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
```js
// 例如，查询字符串 'foo=bar&abc=xyz&abc=123' 会被解析为：
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

### 总结：
#### `http` 服务大致流程
1. 引入 `http` 模块;
2. 创建服务 `createServer`
3. 接收，发生响应；
	1. 引入 `querystring` 模块，解析路由 `querystring.parse()`
	2. 设置响应头（包括状态码）等 `res.writeHead()`
	3. 返回数据 `res.write()`
	4. 完成响应，断开连接 `res.end()`

#### 设置响应头的方法：
##### `response.writeHead(statusCode[, statusMessage][, headers])`
> 向请求发送响应头。 状态码是一个 3 位的 HTTP 状态码，如 404。 最后一个参数 headers 是响应头。 可以可选地将用户可读的 statusMessage 作为第二个参数。
- statusCode <number>
- statusMessage <string>
- headers <Object>
- 返回: <http.ServerResponse>
```js
const body = 'hello world';
response
  .writeHead(200, {
    'Content-Length': Buffer.byteLength(body),
    'Content-Type': 'text/plain'
  })
  .end(body);
```

#### `response.statusCode` 设置状态码
> 当使用隐式的响应头时（没有显式地调用 response.writeHead()），此属性控制在刷新响应头时将发送到客户端的状态码。
```js
response.statusCode = 404;
```

#### `response.setHeader(name, value)` 设置响应
> 为隐式响应头设置单个响应头的值。 如果此响应头已存在于待发送的响应头中，则其值将被替换。 在这里可以使用字符串数组来发送具有相同名称的多个响应头。 非字符串值将被原样保存。 因此 response.getHeader() 可能返回非字符串值。 但是非字符串值将转换为字符串以进行网络传输。
```js
// 当使用 response.setHeader() 设置响应头时，它们将与传给 response.writeHead() 的任何响应头合并，其中 response.writeHead() 的响应头优先。

// 返回 content-type = text/plain
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
```