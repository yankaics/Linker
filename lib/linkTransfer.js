var MD5 = require('MD5'),
	config = require('./conf/config.js');

function getCode (str, num) {
	var key = config.md5.key || 'key';
	str += key;
	str = MD5(str);
	num = num || 67;
	var i = 4;
	var code = '';
	console.log('generating the code......');
	while (i --> 0) {
		var temp = str.substring(i * 8, (i + 1) * 8);
		var intCode = parseInt(temp, 16);
		intCode = intCode % num - 61 * Math.floor(intCode % num / 61); // 使intCode落在 [0,61]的区间中
		// 转换intCode为char字符
		code += intCode >= 10 ? String.fromCharCode(((intCode + 55 >= 91) ? intCode + 61 : intCode + 55)) : intCode;
	}
	console.log('success!!! the code is ' + code);
	return code;
}

module.exports = getCode;