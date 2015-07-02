var express = require('express'),
    session = require('express-session'),
    cookieParser = require('cookie-parser')
    MemcachedStore = require('connect-memcached')(session),
    dataHandler = require('./DataHandler'),
    bodyParser = require("body-parser"),
    linkTransfer = require('./linkTransfer'),
    config = require('./conf/config');

app = express();

app.use(cookieParser());
app.use(session({
        secret  : 'vincent', 
        proxy   : 'false',
        store   : new MemcachedStore({
        hosts: [config.memcached.host+ ':' + config.memcached.port]
    })
}));

app.get('/api/:id', function (req, res) {
    var id = req.params.id;
    dataHandler.getLink(id , function (err, results) {
        if (err) {
            res.send('{"status":0}')
        } else {
            if (results.length <= 0) {
                res.status(404).send('<html><body style="text-align:center"><h1>404</h1><h2>Not Found</h2></body></html>');
                return ;
            }
            res.redirect(results[0].url);    
            
        }
    });
});

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())

app.post('/api', function (req, res) {
    if (!req.session.id) {
        res.redirect('/login.html');
        return ;
    }
    var url = req.body.url;
    if (!url) {
        res.send('{"status": 0}');
        return ;   
    }
    var i = 0;
    if (!/http\:\/\//.test(url)) {
        url = 'http://' + url;
    }
    function setCode(url, num) {
        var code = linkTransfer(url, num);
        dataHandler.setLink([code, url], function (err, results) {
            if (!err) {
                res.json({status: 1,
                    code: code
                });
            } else {
                if (i < 2) {
                    num = num || 67;
                    i++;  
                    dataHandler.getLink(code , function (err, results) {
                        if (err) {
                            res.send('{"status":0}')
                        } else {
                            if (url === results[0].url) {
                                res.json({
                                    status: 2,
                                    code: results[0].short_url
                                });
                            } else {
                                setCode(url, num + 1);            
                            }
                        }
                    });
                    // setCode(url, num + 1);
                } else {
                    res.send('{"status": 0}')
                }
                
            }
        });
    }
    setCode(url);
});

app.post('/login', function (req, res) {
   var username = req.body.username;
   var pass = req.body.password;
   dataHandler.login(username, pass, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send('<html><body style="text-align:center"><h1>server error</h1><h2></h2></body></html>');
        } else {
            if (results.length === 1) {
                req.session.userId = results[0].id;
                res.send('{"status": 1}');
            } else {
                res.send('{"status": 0}');
            }
        }
   }); 
});

app.get('/logout', function (req, res) {
    delete req.session.userId;
    res.json({
        status: 1
    });
})

app.post('/regist', function (req, res) {
    var username = req.body.username;
    var pass = req.body.password;
    dataHandler.regist(username, pass, function (err, results) {
        if (err) {
            console.log(err);
            res.send('{"status": 0}')
        } else {
            dataHandler.login(username, pass, function(err, results) {
                if (err) {
                    console.log(err);
                    res.status(500).send('<html><body style="text-align:center"><h1>server error</h1><h2></h2></body></html>');
                } else {
                    if (results.length === 1) {
                        req.session.userId = results[0].id;
                        res.send('{"status": 1}');
                    } else {
                        res.send('{"status": 0}');
                    }
                }
           });
        }
    })
});

app.use(/\/(index.html){0,1}/, function (req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login.html');
    }
});

app.use(express.static(__dirname + config.web.public));

app.listen(config.web.port, function () {
    console.log('server start at port ' + config.web.port);
});