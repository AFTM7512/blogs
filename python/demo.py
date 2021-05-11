class Person:
  '''这里加上注释，给类加上简要的说明'''
  def __init__(self, name, age):
    # 这里定义的方法，都是定义在实例后的对象上
    self.name = name
    self.age = age
  def speak(self):
    print(f'{self.name}的年纪是{self.age}')
zs = Person('zs', 18)
zs.speak()