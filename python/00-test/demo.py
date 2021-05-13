from functools import wraps

def log(type):
  # 简单实现一个参数逻辑
  if type == 'sum':
    print('sum')
  else:
    print('del')

  def decorator(func):
    @wraps(func)
    def wrapper(*argvs, **kwargv):
      print('---')
      return func(*argvs, **kwargv)
    return wrapper
  return decorator

@log(type = 'sum')
def sum(a, b):
  return a + b

sum(1, 2)