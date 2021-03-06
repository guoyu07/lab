'use strict';

var co = require('co');
var thunkify = require('thunkify');

var step_1 = thunkify(function (val, callback) {
	setTimeout(function(){
		callback(null, val + 1);
	},1000)
})

var step_2 = thunkify(function (val, callback) {
	setTimeout(function(){
		callback(null, val + 1);
	},2000)
})

function* gen(x){
	console.log('x:',x);
	console.time('gen');

  var y = yield step_1(x);
  	console.log('y:',y);

  var z = yield step_2(y);
  	console.log('z:',z)

  	console.timeEnd('gen');
  return z;
}

co(gen,1);


/*var test = function (val, callback) {
	setTimeout(function(){
		callback && callback(null, val + 'testvalue');
	},1000)
}

var test_error = function (val, callback) {
	setTimeout(function(){
		console.log(error);
		callback && callback(null, val + 'testvalue');
	},1000)
}

// with thunkify
var _testFun = function* (){
	let val = yield thunkify(test)('test');

	console.log(val,1);
}

// without thunkify
var testFun = function* (){
	let val = yield test('test');

	console.log(val,2);
}

// try catch test
var testErrorFun = function* (){
	try{
		let val = yield thunkify(test_error)('test');
	}catch(err){
		console.log('error');
	}
	console.log(val,3);
}

co(_testFun);

co(testFun);

co(testErrorFun);*/