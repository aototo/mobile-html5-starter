import './assets/app.scss';
import './lib/mobile-util.js';
import $ from 'jquery';
// import './lib/vconsole.min.js';

/* 限制浏览器上下滑动 */
document.addEventListener('touchmove', function (e) {
	e.preventDefault();
},true);

function app() {
	console.log('-------Dom is loaded! running....--------');
}

// The DOM is now loaded
$(() => app());
