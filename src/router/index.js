import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import Products from '@/components/product/Products'
import ProductsIndex from '@/components/product/Index'
import CreateProduct from '@/components/product/Create'
import EditProduct from '@/components/product/Edit'
import ViewProduct from '@/components/product/View'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'register',
      component: Register
    },
    {
      path: '/products',
      component: Products,
      children: [
        {
          path: '',
          component: ProductsIndex,
          name: 'products'
        },
        {
          path: 'create-product',
          component: CreateProduct,
          name: 'create-product'
        },
        {
          path: 'edit-product/:id',
          component: EditProduct,
          name: 'edit-product'
        },
        {
          path: 'view-product/:id',
          component: ViewProduct,
          name: 'view-product'
        }
      ]
    }
  ]
})
