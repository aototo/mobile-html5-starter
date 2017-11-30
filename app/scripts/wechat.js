
/* global wx */
let wechatEvent = function(shareEvent) {
	// 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
	wx.onMenuShareTimeline({
		title: '测试', // 分享标题
		link: 'http://mercurymage.com/h5/ballGame/',// 分享链接
		imgUrl: 'http://mercurymage.com/h5/ballGame/assets/images/shareImg.jpg', // 分享图标
		success: function () {
			shareEvent? shareEvent() : '';
		},
		cancel: function () {
		}
	});

	// 获取“分享给朋友”按钮点击状态及自定义分享内容接口
	wx.onMenuShareAppMessage({
		title: '测试', // 分享标题
		desc: '测试！', // 分享描述
		link: 'http://mercurymage.com/h5/ballGame/',// 分享链接
		imgUrl: 'http://mercurymage.com/h5/ballGame/assets/images/shareImg.jpg', // 分享图标
		type: '', // 分享类型,music、video或link，不填默认为link
		dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		success: function () {
			shareEvent? shareEvent() : '';
		},
		cancel: function () {
		}
	});
};

export default wechatEvent;
