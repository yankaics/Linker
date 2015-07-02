(function ($) {
	function login() {
		$.ajax({
			url: '/login',
			type: 'post',
			aysnc: true,
			dataType: 'json',
			data: {'username': $('#username').val(), 'password': $('#pass').val()},
			success: function (data) {
				console.log(data)
				if (data.status) {
					location.href = '/';
				} else {
					alert('登陆失败，请检查账号和密码是否输入错误！！！');
				}
			},
			error: function (data) {	
				alert('发生错误，请检查网络是否中断！！！');
			}
		});
	}
	function regist() {
		window.location.href = '/regist.html';
	}
	$('#login-btn').bind('click', login);
	$('#regist-btn').bind('click', regist);
    $('input').keypress(function (event) {
        if (event.keyCode === 13) {
            login();     
        }
    });
})(window.jQuery);