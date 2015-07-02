(function ($) {
	function generateCode () {
		var long_url = $('#long-url').val();
		if (!long_url) {
			alert('请输入需要转换的链接');
			return ;
		}
		$.ajax({
			url: '/api',
			type: 'post',
			dataType: 'json',
			async: true,
			data: {url: long_url},
			success: function (data) {
				console.log(data);
				switch(data.status) {
					case 0: {
						alert('生成失败，该链接无法被生成！！！');
						break;
					}
					case 1: {
						var url = 'http://' + location.host + '/api/' + data.code;
						$('#show').val(url);
						break;
					}
					case 2: {
						alert('重复！！！该链接已被生成过了！！！');
						var url = 'http://' + location.host + '/api/' + data.code;
						$('#show').val(url);
						break;
					}
					default: {
						break;
					}
				}
			},
			error: function (err) {
				alert('系统发生错误，请检查网络是否存在问题！！！');
			}
		});
	}

	function logout() {
		$.ajax({
			url: '/logout',
			type: 'get',
			dataType: 'json',
			async: true,
			success: function (data) {
				if (!data.status) {
					alert('退出失败');
				} else {
					location.href = '/login.html';
				}
			},
			error: function (err) {
				alert('网络错误，请检查您的网络设置!!!');
			}
		});
 	}

	$('#generate-btn').bind('click', generateCode);
	$('#logout-btn').bind('click', logout);
})(window.jQuery);