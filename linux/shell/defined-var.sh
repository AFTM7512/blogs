
# 定义变量
# 1. 变量名和等号之间不能有空格

str='123'

# 2. 使用 ${} 包裹变量 - 推荐
echo ${str}
# 3. 大括号可以省略
echo $str

# 变量的命名
# 1.命名只能使用英文字母，数字和下划线，首个字符不能以数字开头；
# 2.中间不能有空格，可以使用下划线（_）；
# 3.不能使用标点符号；
# 4.不能使用bash里的关键字（可用help命令查看保留关键字）。


# 设置只读变量
readonly url_start='https://'
echo $url_start
# url_start='111' 修改失败：url_start: readonly variable

# 删除变量
unset $url_start
# echo $url_start 将变量删除后，无法再次使用
