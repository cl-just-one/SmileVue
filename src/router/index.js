import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/shoppingMall'
import Register from '@/components/pages/register'
import Login from '@/components/pages/login'
import Goods from '@/components/pages/goods'
import Category from '@/components/pages/category'
import Cart from '@/components/pages/cart'
import Main from '@/components/pages/main'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/main',
        component: Main,
        children: [{
            path: '/',
            name: 'ShoppingMall',
            component: ShoppingMall
        }, {
            path: '/category',
            name: 'Category',
            component: Category
        }, {
            path: '/cart',
            name: 'Cart',
            component: Cart
        }]
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/goods',
        name: 'Goods',
        component: Goods
    }]
})