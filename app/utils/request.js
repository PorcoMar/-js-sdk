const REQUEST = require("request");
const haoniangjiaUrl = require('../../config/config').haoniangjiaUrl
console.log(haoniangjiaUrl)
let request = ()=>{
	return new Promise((resolve,reject)=>{
		let result = [
			{AAA:"red",BBB:"orange"},
			{AAA:"yellow",BBB:"green"},
			{AAA:"blue",BBB:"purple"}
		]
		resolve(result)
	})
}

const requestList = (url, params) => {
	return new Promise((resolve, reject) => {
		REQUEST.post({
			url: haoniangjiaUrl,
			form: params
		},function(err, httpResopnse, body){
			console.log(typeof body)
			console.log(body)
			resolve(body)
		})
	})
}
module.exports = {
	request : request,
	requestList: requestList
}