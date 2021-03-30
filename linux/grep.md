> grep 命令用于查找文件里符合条件的字符串。

## 常用参数
1. -c 或 --count : 计算符合样式的列数；
2. -i 或 --ignore-case : 忽略字符大小写的差别；
3. -l 或 --file-with-matches : 列出文件内容符合指定的样式的文件名称；
4. -r 或 --recursive : 此参数的效果和指定"-d recurse"参数相同。

## 示例
1. 在当前目录中，查找后缀为 `.md` 的文件中包含 `linux` 字符串的行并打印出来。
```bash
grep linux *.md
# 认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# 认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# 文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
```

2. 以递归的方式查找文件中包含 `linux` 字符串的行并打印出来。
```bash
cd ..
grep -r linux ../blogs/
# ../blogs/linux/grep.md:grep linux *.md
# ../blogs/linux/grep.md:# 认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# ../blogs/linux/grep.md:# 认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# ../blogs/linux/grep.md:# 文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
# ../blogs/linux/文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
# ../blogs/linux/认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# ../blogs/linux/认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
```

3. 在当前目录中，通过 `|(管道符)` 将查询的结果通过 `grep` 进行过滤。
```bash
ls | grep .md
# grep.md
# vim的使用.md
# 操作文件相关常用的命令.md
# 查看命令的常用命令.md    
# 目录相关的常用命令.md    
# 认识Linux目录.md
# 软硬链接.md
# 文件权限.md
# 下载软件的方式.md

ls | grep linux *.md
# grep.md:1. 在当前目录中，查找后缀为 `.md` 的文件中包含 `linux` 字符串的行并打印出来。
# grep.md:grep linux *.md
# grep.md:# 认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# grep.md:# 认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# grep.md:# 文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
# grep.md:2. 以递归的方式查找文件中包含 `linux` 字符串的行并打印出来。
# grep.md:grep -r linux ../blogs/
# grep.md:# ../blogs/linux/grep.md:grep linux *.md
# grep.md:# ../blogs/linux/grep.md:# 认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# grep.md:# ../blogs/linux/grep.md:# 认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# grep.md:# ../blogs/linux/grep.md:# 文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
# grep.md:# ../blogs/linux/文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
# grep.md:# ../blogs/linux/认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# grep.md:# ../blogs/linux/认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# 认识Linux目录.md:* `/media：` linux系统会自动识别一些设备，例如U盘、光驱等等，当识别后，linux会把识别的设备挂载到这个目录下。
# 认识Linux目录.md:* `/sys：` 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。
# 文件权限.md:![permission](https://www.linuxidc.com/upload/2017_02/170208084347692.png)
```