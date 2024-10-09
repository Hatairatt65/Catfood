import Vue from 'vue'
import Router from 'vue-router'

import UserIndex from '@/components/User/index'
import UserEdit from '@/components/User/EditUser'
import UserCreate from '@/components/User/CreateUser'
import UserShow from '@/components/User/ShowUser'
import Login from '@/components/Login'

import CommentIndex from '@/components/Comments/index' 

import CatfoodIndex from '@/components/Catfoods/index'
import CatfoodCreate from '@/components/Catfoods/CreateCatfood'
import CatfoodShow from '@/components/Catfoods/ShowCatfood'
import CatfoodEdit from '@/components/Catfoods/EditCatfood'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/create',
      name: 'user-create',
      component: UserCreate
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/catfoods',
      name: 'catfoods',
      component: CatfoodIndex
    },
    {
      path: '/catfood/create',
      name: 'catfood-create',
      component: CatfoodCreate
    },
    {
      path: '/catfood/edit/:catfoodId',
      name: 'catfood-edit',
      component: CatfoodEdit
    },
    {
      path: '/catfood/:catfoodId',
      name: 'catfood',
      component: CatfoodShow
    },
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
  ]
})
