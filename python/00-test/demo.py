# def counter():
#   i = [0]
#   def sum_once():
#     i[0] += 1
#     return i[0]
#   return sum_once

# it = counter()
# print(it())
# print(it())
# print(it())


a = 123
b = [1, 2, 3]
def test():
  print(a)
  print(b)
  a = a + 1
  print(a)
  print(b[1] + 1)
test()