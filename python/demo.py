import copy;

str1 = 'abc';
print(id(str1)); # 24715488
str2 = copy.copy(str1);
print(id(str2)); # 24715488
str1 = 'ddd';
print(str1, str2); # ddd abc

list1 = [1, 2, [3, 4]];
print(id(list1)); # 26216264
print(id(list1[0])); # 1457498032
print(id(list1[2])); # 25659592
list2 = copy.copy(list1);
print(id(list2)); # 26216296
print(id(list2[0])); # 1457498032
print(id(list2[2])); # 25659592
list2[2][0] = 5
print(list1, list2) # [1, 2, [5, 4]]  [1, 2, [5, 4]]