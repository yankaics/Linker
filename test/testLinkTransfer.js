var linktransfer = require('./../lib/linktransfer');

var code = linktransfer('https://github.com/3rd-Eden/memcached');

console.log('the code is ' + code);