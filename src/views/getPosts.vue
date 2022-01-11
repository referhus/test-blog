<template>
  <v-container>
    <v-sheet min-height="70vh"
    elevation="1"
    color="#37363d"
    >
      <addPost/>
      <v-row class="mt-4 d-flex justify-space-around align-center">
        <template
        v-for="(post, index) in POSTS"
        >
          <v-col
          cols="10"
          md="3"
          sm="4"
          :key="index" 
          class="ma-1"
          >
            <v-card
            color="black" 
            class="hover-post d-flex justify-center align-center flex-column pa-2"
            height="360">
              <div class="d-flex">
                <div class="post"><v-btn color="#e3874f" dark icon @click="update(post)"><v-icon small>mdi-pen</v-icon></v-btn></div>
                <div class="post"><v-btn color="#e3874f" dark icon @click="deletePost(post.id)"><v-icon small>mdi-delete</v-icon></v-btn></div>
              </div>
              <div class="img mt-1"><img src="../assets/img.jpg" alt=""></div>
              <div class="post text-overflow mt-1 h5 text-center font-weight-bold">{{post.title}}</div>
              <div class="post mt-1 text-right grey--text text--lighten-1"> {{ new Date(post.created_at).toLocaleDateString("ru-RU", {hour: 'numeric', minute: 'numeric', second: 'numeric'}) }}</div>
              <div class="post more mt-1 text-right" link @click="viewPost(post.id)">read more →</div>
            </v-card>
          </v-col>
        </template>
        <v-dialog
        v-model="upd"
        v-if="post"
        max-width="500px">
          <v-form 
          ref="form"
          @submit.prevent="updatePost(post.id)"
          >
            <v-card
            color="#707070">
              <v-card-title
              class="d-flex justify-center align-center">
                <span 
                class="text-h6">
                  Изменение поста
                </span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                    cols="12"
                    sm="11"
                    >
                      <v-text-field
                      label="Название"
                      dark
                      color="#e3874f"
                      v-model="title"
                      ></v-text-field>
                    </v-col>
                    <v-col 
                    cols="12"
                    sm="11"
                    >
                      <v-text-field
                      label="Текст"
                      dark
                      color="#e3874f"
                      v-model="text"
                      >{{post.text}}</v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="#e3874f"
                text
                type="submit"
                >
                  Сохранить
                </v-btn>
                <v-btn
                color="#e3874f" 
                text
                @click="close()"
                >
                  Отмена
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-row>
    </v-sheet>
    <template>
      <div class="text-center mt-4"
      v-if="PAGES > 1"
      >
        <v-pagination
          v-model="page"
          :length="pageCount"
          @input="pagination"
          color="black"
        ></v-pagination>
      </div>
    </template>
  </v-container>
</template>

<script>
 import {mapActions, mapGetters} from 'vuex';
 import addPost from '../components/addPost.vue'
 export default {
   components: {
     addPost
   },
   data: () => ({
    page: 1,
    size: 3,
    post: null,
    upd: false,
    title: '',
    text: ''
   }), 

   computed: {
    ...mapGetters(['PAGES', 'POSTS']),
    pageCount() {
     console.log(this.PAGES)
     return Math.ceil(this.PAGES/this.size)
    }, 
   },

    methods: {
     ...mapActions(['GET_POSTS', 'GET_POST', 'PUT_POST', 'DELETE_POST']),
     pagination(value) {
      this.page = value
      const url = 'posts?page=' + value + '&per_page=3'
     this.GET_POSTS(url)
     },
      viewPost(id) {
        const url = 'posts/' + id
        this.GET_POST(url)
        .then(() => {
          this.$router.push({name: 'post', params: {id: id}})
        })
      },
      update(post) {
        this.post = post
        this.upd = true
        this.title = post.title
        this.text = post.text
     },

     updatePost(id) {
      let payload = {
       post: {
       title: this.title,
       text: this.text
      },
      url: 'posts/' + id
      }
      this.PUT_POST(payload)
      .then(() => {
        this.post = null
        this.upd = false
        this.title = ''
        this.text = ''
        const url = 'posts?page=' + this.page + '&per_page=3'
        this.GET_POSTS(url)
      })
     },

      deletePost(id) {
        const url = 'posts/' + id
        this.DELETE_POST(url)
        .then(() => {
          if(this.POSTS[1] || (this.page == 1)) {
         const url = 'posts?page=' + this.page + '&per_page=3'
         this.GET_POSTS(url)
          } else {
         const url = 'posts?page=' + (this.page-1) + '&per_page=3'
         this.GET_POSTS(url)
         this.page = (this.page-1)
          }
        })
       },

      close() {
       this.upd = false
       this.post = null
      }
     },

     mounted() {
    const url = 'posts?page=' + this.page + '&per_page=3'
    this.GET_POSTS(url)
  }

 }
</script>

<style>
  .img {
    width: 100%;
    overflow: hidden;
  }

  img {
   width: 100%;
  }

  .post {
    width: 95%;
  }

  .hover-post {
    border: 1px solid transparent;
    transition: all 0.3s linear
  }

  .hover-post:hover {
    border: 1px solid #000
  }

  .more {
    cursor: pointer;
    transition: all 0.3s linear;
  }

  .more:hover {
    color: grey;
    font-weight: bold;
  }

  .text-overflow {
    max-width: 95%;
    max-height: 20%;
    width: 250px;
    height: 50px;
    overflow: hidden; 
    text-overflow: ellipsis; 
  }

  @media (max-width: 600px) {
    .text-overflow {
    max-height: 40px;
    height: 40px;
  }
}
  @media (max-width: 520px) {
    .text-overflow {
    max-height: 25%;
    height: 25%;
  }
 }
  @media (max-width: 420px) {
    .text-overflow {
    max-height: 30%;
    height: 30%;
  }
 }
</style>
