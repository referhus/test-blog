<template>
  <v-row 
  class="mt-1"
  justify="center" 
  >
    <v-dialog
    v-model="add"
    max-width="500px"
    >
      <template 
      v-slot:activator="{ on }">
        <v-btn 
        class="mt-3"
        color="#e3874f"
        elevation="1"
        @click="add == true"
        v-on="on"
        >
          <span 
          class="hidden-xs-only">
            добавить пост
          </span>
          <v-icon 
          class="hidden-sm-and-up" 
          small>
            mdi-note-text
          </v-icon>
        </v-btn>
      </template>
      <v-form 
      ref="form"
      @submit.prevent="createPost"
      >
        <v-card
        color="#707070">
          <v-card-title
          class="d-flex justify-center align-center">
            <span 
            class="text-h6">
              Добавление поста
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
                  color="#e3874f"
                  dark
                  label="Текст"
                  v-model="text"
                  ></v-text-field>
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
</template>

<script>
  import {mapActions} from 'vuex';
  export default {
    name: 'addPost',

    data: () => ({
      add: false,
      title: '',
      text: '',
    }),

    methods: {
    ...mapActions([
      'CREATE_POST',
      'GET_POSTS',
    ]),

    async createPost() {
      let post = {
         title: this.title,
         text: this.text,
      }
      await this.CREATE_POST(post)
         .then(() => {
          this.GET_POSTS()
          this.title = ''
          this.text = ''
          this.add = false
         })
         .catch(err => {
          console.log(err)
        })
      },

      close() {
        this.title = ''
        this.text = ''
        this.add = false
      }
    }
  }
</script>
