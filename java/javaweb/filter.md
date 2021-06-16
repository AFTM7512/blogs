## 实现一个 filter 的步骤
1. 实现一个 `Filter` 的接口：
```java
package com.baidu.filter;

import javax.servlet.*;
import java.io.IOException;

/**
    1. 导入的包必须为  javax.servlet.Filter
    2. 重写 init， doFilter， destroy
    3. doFilter 必须在最后面调用 filterChain 方法，让代码继续往下执行，不然代码会停在当前 Filter 中，不往下继续执行
 */
public class FilterEncoding implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // filter 是在 web 服务器已启动的时候，就启动的。此时可以设置一下 servletContext 参数等
        System.out.println("FilterEncoding 启动了");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletRequest.setCharacterEncoding("utf-8");
        servletResponse.setCharacterEncoding("utf-8");
        servletResponse.setContentType("text/html;charset=UTF-8");

        // 让代码继续往下执行
        filterChain.doFilter(servletRequest, servletResponse);
    }

    @Override
    public void destroy() {
        // 在 web 服务器关闭之前关闭
        System.out.println("FilterEncoding 关闭了");
    }
}
```

2. 设置 `Filter` 的映射规则
```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0"
         metadata-complete="true">
    <servlet>
      <servlet-name>hello</servlet-name>
      <servlet-class>com.baidu.servlet.Hello</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>hello</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>
    <servlet-mapping>
      <servlet-name>hello</servlet-name>
      <url-pattern>/admin/hello</url-pattern>
    </servlet-mapping>

    <!--  设置过滤器  -->
    <filter>
      <filter-name>encoding</filter-name>
      <filter-class>com.baidu.filter.FilterEncoding</filter-class>
    </filter>
    <filter-mapping>
      <filter-name>encoding</filter-name>
      <!-- 只有 admin 下面的的接口才会执行这个 Filter -->
      <url-pattern>/admin/*</url-pattern>
    </filter-mapping>
</web-app>
```