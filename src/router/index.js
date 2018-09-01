import Vue from 'vue'
import Router from 'vue-router'
import HeroesList from '@/components/HeroesList'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/heroes' },
    {
      path: '/heroes',
      name: 'Heroes',
      component: HeroesList
    }
  ]
})
