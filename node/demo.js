// const { EventEmitter } = require('events')
// const eventEmitter = new EventEmitter()

// eventEmitter.on('say', () => {
//   console.log('say hello');
// })

// setTimeout(() => {
//   eventEmitter.emit('say')
// }, 1000)
// console.log('执行结束！');

const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener1', argv1, argv2);
})
eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener2', argv1, argv2);
})
eventEmitter.on('listener1', (argv1, argv2) => {
  console.log('listener3', argv1, argv2);
  return 'xx'
})

eventEmitter.prependListener('listener1', (argv1, argv2) => {
  console.log('prependListener', argv1, argv2);
})


setTimeout(() => {
  eventEmitter.emit('listener1', 'argv1', 'argv2')
}, 1000)
console.log('执行结束！');

// 执行结果
// 执行结束！
// prependListener argv1 argv2
// listener1 argv1 argv2
// listener2 argv1 argv2
// listener3 argv1 argv2