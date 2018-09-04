import Vue from 'vue'
import Router from 'vue-router'
import HeroesList from '@/components/HeroesList'
import Hero from '@/components/Hero'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: {name: 'Heroes'}},
    {
      path: '/heroes',
      name: 'Heroes',
      component: HeroesList
    },
    {
      path: '/heroes/:id',
      name: 'Hero',
      component: Hero
    }
  ]
})
