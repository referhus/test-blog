import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   posts: '',
   post: '',
   comments: '',
   pages: ''
  },

  getters: {
   POSTS(state) {
    return state.posts
   },

   POST(state) {
    return state.post
   },

   COMMENTS(state) {
    return state.comments
   },

   PAGES(state) {
    return state.pages
   },
  },

  mutations: {
   SET_POSTS(state, posts) {
    state.posts = posts
  },

   SET_POST(state, post) {
    state.post = post
  },

   SET_COMMENTS(state, comments) {
    state.comments = comments
  },

   SET_PAGES(state, pages) {
    state.pages = pages
  },

   ADD_POST: (state, post) => {
    state.posts.push(post)
  },

   ADD_COMMENT: (state, comment) => {
    state.comments.push(comment)
  },

  },
  
  actions: {
   async GET_POSTS({commit}, url) {
    let {data} = await axios.get(url)
     commit('SET_POSTS', data.data)
     commit('SET_PAGES', data.total)
  },

   async GET_POST({commit}, url) {
    let {data} = await axios.get(url)
     commit('SET_POST', data.post)
     commit('SET_COMMENTS', data.comments)
  },

  async PUT_POST({commit}, payload) {
    let url = payload.url
    console.log(commit)
    await axios.put(url, payload.post)
  },

   CREATE_POST ({ commit }, post) {
     return new Promise(() => {
      axios
        .post(`posts`, post)
        .then(({ data }) => {
          commit("ADD_POST", data);
        })
        .catch(error => {
          console.log(error)
        })
    })
  },

   CREATE_COMMENT ({ commit }, payload) {
     return new Promise(() => {
      let url = payload.url
      axios
        .post(url, payload.comment)
        .then(({ data }) => {
          commit("ADD_COMMENT", data);
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  
  async DELETE_POST({commit}, url) {
    console.log(commit)
    await axios.delete(url)
  }

  },
})
