import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/shoppingMall'
import Register from '@/components/pages/register'
import Login from '@/components/pages/login'
import Goods from '@/components/pages/goods'
import Category from '@/components/pages/category'
import Cart from '@/components/pages/cart'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'ShoppingMall',
        component: ShoppingMall
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
    }, {
        path: '/category',
        name: 'Category',
        component: Category
    }, {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }]
})