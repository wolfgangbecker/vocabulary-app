import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/components/List'
import Test from '@/components/Test'
import Results from '@/components/Results'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello-world',
      name: 'HelloWorld',
      component: HelloWorld
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
