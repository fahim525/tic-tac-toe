import Vue from 'vue'
import VueRouter from 'vue-router'
import Game from '../views/Game';
const GameHistory = () => import('../views/GameHistory');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: Game,
  },
  {
    path: '/history',
    name: 'history',
    component: GameHistory,
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: () => import(/* webpackChunkName: "about" */ '../views/Game2.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
