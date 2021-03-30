
:<<!
  expr length string
  1. 计算字符串的长度
!
echo `expr length "this is string"` # 14

:<<!
  expr index string xx
  1. 查询第一个字符数字串出现的位置；
  2. 不管后面多少个字母，返回第一个匹配到的字母位置；
  3. 索引从 1 开始。
!
echo `expr index "javascript" ia`

:<<!
  expr substr string postion length
  1. 截取字符串；
  2. 索引从 1 开始。
!
echo `expr substr "javascript" 2 5` # avasc

:<<!
  expr 2 + 2
  1. 整数运算；
  2. 使用乘号时，必须用反斜线屏蔽其特定含义。因为shell可能会误解显示星号的意义。
!
echo `expr 2 + 2` # 4
echo `expr 30 \* 3 ` # 90