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
module.exports = {
	request : request
}