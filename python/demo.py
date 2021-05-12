class Person():
  '''这是一个关于类的简短描述'''
  version = '2.0'
  def __init__(self, name):
    self.name = name
  
  def eat(self):
    print('Person eat...')
  
  def sleep(slef):
    print('sleep ...')

# 单继承
class Student(Person):
  # 继承需要加上父类的属性
  def __init__(self, name, age):
    #调用父类的构函
    Person.__init__(self, name)
    self.age = age
  
  # 覆写父类的方法
  def eat(self):
    print('Student eat...')

zs = Student('zs', 18)
# 父类的属性也可以被继承后使用
print(zs.version) # 2.0
print(zs.age) # 18
zs.eat() # student eat...

# 多类继承(不推荐使用)
class Animal():
  def eat(self):
    print('Animal eat...')

class Teacher(Person, Animal):
  def sleep(self):
    # 通过 supper 方法调用父类的方法
    super().sleep()

confucius = Teacher('孔子')
# 由于继承时, Person在前,则使用的时 Person 的 eat 方法
confucius.eat() # Person eat... 
confucius.sleep() # sleep ...  