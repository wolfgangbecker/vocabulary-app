import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Test from '@/components/Test'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/results',
      name: 'Results',
      component: Results
    }
  ]
})
