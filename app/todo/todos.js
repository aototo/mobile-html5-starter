// import $ from 'jquery';
// import Backbone from 'backbone';
// // import BackboneLocalstorage from 'backbone.localstorage';
//
// var Todo = function() {
//   console.log(Backbone)
//
//   let todoModel= Backbone.Model.extend({
//     //设置默认的属性
//     defaults: {
//       title: 'empty todo...',
//       order: Todos.nextOrder(),
//       done: false
//     },
//
//     // 设置任务完成状态
//     toggle: () => {
//       this.save({
//         done: !this.get("done")
//       });
//     }
//   })
//
//   let todoList = Bcakbone.Collection.extend({
//     // 设置Collection的模型为todoModel
//     model: todoModel,
//
//     //存储到浏览器，已todos-backbone命名的空间中
//     //此函数为Backbone插件提供
//     localStorage: new Backbone.LocalStorage("todos-backbone"),
//
//     //获取所有已经完成的任务数组
//     done: function() {
//       return this.where({done: true})
//     }
//   })
// }
//
// export default Todo;
