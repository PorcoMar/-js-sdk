

const haoniangjiaUrl = require("../../config/config.js").haoniangjiaUrl
const requestData = require("../utils/request").request;
const requestList = require("../utils/request").requestList;

function indexTest(){
	var result = ["test1","test2"]
	abcPromise((res)=>{
		console.log("===========")
		console.log(res)
		//这里调用事没问题就是渲染的时候不允许加载时间有间隔的，在脚本里是先打印出返回的
		//result值，然后再执行 abcPromise函数
		result.push("newOne")
	})
	return result;

}
/**
 * [description]
 * @param  {[type]} back2 [description]
 * @return {[type]}       [description]
 */
// let add_call = (back2) => {
// 	let result = ['1','2']
// 	params = {
// 		pageSize:10,
// 		pageNo:1
// 	}
// 	requestList('/information/list',params)
// 	.then((res) => {
// 		console.log('调用请求………………^_^')
// 		let data = JSON.parse(res)
// 		return `this is newData : ${data.errorMsg}`
// 	})
// 	.then((res) => {
// 		result.push(res)
// 		console.log(result)
// 		back2(result)
// 	}) 
// }

// let abc2 = () => {
// 	let result = ['pp']
// 	add_call((num) => {
// 		console.log('num======', num)
// 		result.push(num)
// 		return result
// 	})

// }
/****/



var abcPromise = (callBack)=>{
	console.log("-=-=-=-=-=--==-")
	let result = ["color1"];
	requestData().then((res)=>{
		console.log(res)
		res.map((item)=>{
			result.push(item.AAA)
			result.push(item.BBB)
		})
		return result;
	})
	.then((res)=>{
		console.log("------===res==----")
		console.log(res)
		callBack(res)	
	})	
}

var callBack = ()=>{
	var result = ["aaa","bbb","ccc","ddd"]
	add_callback(3, 15, function(num){
	    console.log("call====== " + num);
	    result.push(num)
	});
	return result
}

var add_callback = (p1,p2,back)=>{
	var abc = p1*p2;
	setTimeout(()=>{
		abc = p1+p2;
		back(abc)
	},3000)
	back(abc)
}
module.exports ={
	indexTest:indexTest,
	callBack:callBack
}