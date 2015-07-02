(function ($) {
	function regist() {
		var username = $('#username').val();
		if (!username) {
			alert('用户名不能为空！！！');
			return ;
		}
		var pass = $('#pass').val();
		if (!pass) {
			alert('密码不能为空！！！');
			return ;
		}
		var pass_re = $('#pass-re').val();
		if (pass !== pass_re) {
			alert('两次输入的密码不相符，请检查');
			return ;
		}
		$.ajax({
			url: '/regist',
			type: 'post',
			aysnc: true,
			dataType: 'json',
			data: {'username': $('#username').val(), 'password': $('#pass').val()},
			success: function (data) {
				if (data.status) {
					location.href = '/'
				}
			},
			error: function (data) {	
				alert('发生错误，请检查网络是否中断！！！');
			}
		});
	}
	$('#regist-btn').bind('click', regist);
    $('input').keypress(function (event) {
        if (event.keyCode === 13) {
            regist();     
        }
    });
})(window.jQuery);