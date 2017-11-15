// import Todo from './todo/todos.js'
import './assets/app.scss';
import './lib/mobile-util.js';
import $ from 'jquery';
import './lib/vconsole.min.js';

/* 限制浏览器上下滑动 */
document.addEventListener('touchmove', function (e) {
  e.preventDefault();
},true);
