
# 使用 单引号
:<<!
  1. 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
  2. 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。
!
str='你好'
str1='你好${str}'
str2='你好 \"' 
echo ${str1} # 你好${str}
echo ${str2} # 你好 \"

# 使用 双引号 
:<<!
  1. 双引号里可以有变量;
  2. 双引号里可以出现转义字符;
!
str3="\"${str}\"" # "你好"
echo ${str3}

# 获取字符串长度
str4='abcd'
echo ${#str4} # 4, 在字符串变量前增加 # ，获取字符串的长度

echo `expr substr "this is a test" 3 5`

# 截取字符串 
:<<!
  1. 格式： ${string:position:length}；
  2. 其中 :length 可以省略；
  3. position 从 0 开始
!
str5='string'
echo "${str5:2}"   # ring
echo "${str5:2:2}" # ri
