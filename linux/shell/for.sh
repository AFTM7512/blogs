
:<<!
一般格式：
  for var in item1 item2 ... itemN
  do
      command1
      command2
      ...
      commandN
  done

写成一行：
  for var in item1 item2 ... itemN; do command1; command2… done;
!
arr=(1 2 3)
for i in ${arr};
do
  echo $i
done