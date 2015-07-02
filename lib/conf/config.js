module.exports = {
	web: {
		port: 8080,
		public: '/../public'
	},
	memcached: {
		host: '192.168.221.130',
		port: '11211',
		cacheTimeout: 1000
	},
	mysql: {
		host: '192.168.221.130',
		user: 'root',
		port: '3306',
		password: '123456',
		database: 'link'
	},
	md5: {
		key: 'vincent'
	}
};