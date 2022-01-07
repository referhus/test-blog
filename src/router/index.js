import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios"
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

axios.defaults.baseURL = "http://80.249.147.222:3000/api/v1/";

export default router
