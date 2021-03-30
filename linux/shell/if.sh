:<<!
if condition1
then
  command1
elif condition2 
then 
  command2
else
  commandN
fi

  !. 如果 else 分支没有语句执行，就不要写这个 else；
  2. condition 中 [] 需要空格
!

a=10
b=10

if [ $a = $b ]
then 
  echo 'a = b'
elif [ $a -gt $b ]
then
  echo 'a > b'
elif [ $a -lt $b ]
then 
  echo 'a < b'
else
  echo '没有符合条件的数据'
fi

# 如果只有一个判断语句
if [ $a = $b ]; then echo 'a 等于 b'; fi