import Vue from 'vue'
import VueRouter from 'vue-router'
import getPosts from "../views/getPosts.vue"
import viewPost from "../views/viewPost.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blog',
    component: getPosts
  },
  {
    path: '/post/:id',
    name: 'post',
    component: viewPost
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
