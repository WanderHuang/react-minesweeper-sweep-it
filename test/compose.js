// compose接收多个函数 返回一个函数
// 当前函数执行结果不断被缓存到前一次的参数中，形成调用链
const compose = function (...funcs) {
	return funcs.reduce(function(prev, current) {
    return function (...args) {
      return prev(current(...args))
    }
	})
}
// 箭头函数版本
const compose2 = (...funcs) => funcs.reduce((prevFunc, currFunc) => (...args) => prevFunc(currFunc(...args)))

const a = function(a) {
	console.log('a', a, a + 1)
	return a + 1
}
const b = function (b) {
	console.log('b', b, b + 2)
	return b + 2
}
const c = function (c) {
	console.log('c', c, c + 3)
	return c + 3
}
// 此时d是接收参数的函数，内部包含一个a(b(c(args)))的调用栈
// 大概是这个样子
// function d (...args) {
//   return a(b(c(...args)))
// }
const d = compose(a, b, c)
d(1)