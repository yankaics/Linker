#Linker
## 使用方法
```
npm install  
npm start
```

## 配置文件
目录路径 lib/conf/config.js

```
module.exports = {
	web: {
		port: 8080, // 设置服务器使用的端口号
		public: '/../public'  // 设置静态文件目录，这个项目这里不要动！！！
	},
	memcached: {
		host: '192.168.221.130', // 设置memcached地址，目前没有支持分布式的缓存服务器
		port: '11211', // 设置端口
		cacheTimeout: 1000 // 设置缓存超时
	},
	mysql: {
		host: '192.168.221.130', // 设置MySql地址
		user: 'root', // 设置MySql用户名
		port: '3306', // 设置MySql端口号
		password: '123456', // 设置MySql密码
		database: 'link' // 设置MySql数据库
	},
	md5: {
		key: 'vincent' // 进行md5加密时使用的密钥
	}
};
``` 

##  数据库脚本
> 已包含了一些测试数据  
  
目录路径 /db/Link.sql  
