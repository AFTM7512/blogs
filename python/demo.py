matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
list3 = [subItem for item in matrix for subItem in item if subItem % 2 == 0]
print(list3)