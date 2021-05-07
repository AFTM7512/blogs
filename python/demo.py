import math

# print(math.ceil(4.1)) # 
# print(math.ceil(4.9))

# print(math.floor(4.1))
# print(math.floor(4.9))

# print(math.modf(4.1))


# import random
# print(random.random())
# print(math.floor(random.random() * 10))

# print(random.uniform(5, 10), random.uniform(7, 14))
# list1 = [1, 2, 3, 4, 5]
# random.shuffle(list1)
# print(list1) # [3, 4, 1, 5, 2]


# num = 10
# while num > 0:
#   print(num)
#   num = num - 1
# else:
#   print('执行结束')

# str1 = 'abc'
# for item in str1:
#   print(item)
# else:
#   print('执行结束')


# list1 = [1, 2, 3, 4]
# for item in list1:
#   print(item)
# else:
#   print('执行结束')

# tup1 = (1, 2, 3, 4)
# for item in tup1:
#   print(item)
# else:
#   print('执行结束')

# s1 = { 'a', 'b', 'c' }
# for item in s1:
#   print(item)
# else:
#   print('执行结束')

# list1 = [1, 2, 3, 4]
# for item, index in enumerate(list1):
#   print(item, index)
# else:
#   print('循环结束')

list1 = [1, 2, 3, 4]
for item in list1:
  if item == 2:
    continue
  print(item)
else:
  print('执行结束')