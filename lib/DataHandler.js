var Memcached = require('memcached'),
	mysql = require('mysql');
	config = require('./conf/config');

var sqls = {
	get_link: 'select * from link_table where short_url = ?',
	set_link: 'insert into link_table(short_url, url) values (?, ?)',
	get_user: 'select * from user where username = ? and password = ?',
	set_user: 'insert into user(username, password) values (?, ?)'
};

var DataHandler = function () {

};

DataHandler.prototype.init = function () {
	this.memcached = new Memcached(config.memcached.host + ':' + config.memcached.port, {
		timeout: config.memcached.cacheTimeout
	});

	this.memcached.on('failure', function( details ){ sys.error( "Server " + details.server + "went down due to: " + details.messages.join( '' ) ) });

	this.memcached.on('reconnecting', function( details ){ sys.debug( "Total downtime caused by server " + details.server + " :" + details.totalDownTime + "ms")});

	this.mysqlConnection = mysql.createConnection(config.mysql);
};

function mysqlExec(sql, values, callback) {
	var connection = this.mysqlConnection || mysql.createConnection(config.mysql);
	if (Array.isArray(values)) {
		sql = mysql.format(sql, values);
	}
	connection.query(sql, function (err, results, fields) {
		if (typeof callback === 'function') {
			callback(err, results, fields);
		}
	});
}

DataHandler.prototype.login = function (username, pass, callback) {
	mysqlExec.call(this, sqls['get_user'], [username, pass], callback);
}

DataHandler.prototype.regist = function (username, pass, callback) {
	mysqlExec.call(this, sqls['set_user'], [username, pass], callback);
}

DataHandler.prototype.getLink = function (name, callback) {
	var memcached = this.memcached || new Memcached(config.memcached.host + ':' + config.memcached.port, {
		timeout: config.memcached.cacheTimeout
	});
	memcached.get(name, function (err, data) {
		if (err) {
			console.log(err);
		}
		if (data) {
			// console.log('using memcached');
			if (typeof callback === 'function') {
				callback(err, [{
					short_url: name,
					url: data
				}]);
			}
		} else {
			var sql = sqls['get_link'];
			mysqlExec.call(this, sql, [name], function (err, results, fields) {
				if (typeof callback === 'function') {
					callback(err, results, fields);
				}
				if (results.length > 0) {
					memcached.set(name, results[0].url, config.memcached.cacheTimeout ,function (err) {
						if (err) {
							console.log(err);	
						}
						
					});
				}
				
			});
		}
	});
}

DataHandler.prototype.setLink = function (values, callback) {
	var sql = sqls['set_link'];
	mysqlExec.call(this, sql, values, function (err, results, fields) {
		if (err) {
			console.error(err);
		}
		callback(err, results, fields);
	})
}	

var dataHandler =  new DataHandler();

dataHandler.init();

module.exports = dataHandler;