import css from './css/index.css'
import less from './css/less.less'
import sass from './css/sass.scss'
//import Vue from '../node_modules/vue/dist/vue.js'
import Vue from 'vue'
{
    let str = 'Hello Webpack! Hello World';
    document.getElementById('title').innerHTML = str;
}

$("#title").html('hello liqingqing');

var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello I am Vue'
    }
})
