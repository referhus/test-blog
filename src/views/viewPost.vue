<template>
  <v-container>
    <v-sheet min-height="70vh"
    color="#37363d"
    elevation="1"
    >
      <v-row
      class="mt-1 pa-2 d-flex justify-space-around">
        <v-col 
        cols="12">
          <v-app-bar 
          elevation="0" 
          color="#37363d"
          class="d-flex align-center text-center justify-center title"> {{POST.title}}</v-app-bar>
        </v-col>
        <v-col
        cols="10"
        md="4"
        class="img">
          <img src="../assets/img.jpg">
        </v-col>
        <v-col
        cols="10"
        md="6">
          {{POST.text}}
        </v-col>
      </v-row>
      <v-row>
        <v-col
        cols="12">
          <v-divider dark></v-divider>
        </v-col>
      </v-row>
      <v-row
      class="pa-1 d-flex justify-center align-center text-center"
      >
        <v-card
        width="85%"
        color="#707070"
        >
          <v-card-text
          style="height: 130px; overflow-y: scroll;">
            <v-col 
            cols="12"   
            v-for="(comment, index) in COMMENTS"
            :key="index"
            >
              <v-row
              class="d-flex justify-center align-center">
                <v-col
                cols="3"
                class="d-flex align-center justify-center flex-column">
                  <div class="d-flex justify-center align-center avatar grey lighten-2"><v-icon>mdi-account</v-icon></div>
                  <div>{{comment.user}}</div>
                  <div>{{ new Date(comment.created_at).toLocaleDateString("ru-RU", {hour: 'numeric', minute: 'numeric', second: 'numeric'}) }}</div>
                </v-col>
                <v-col
                cols="7">
                  <v-card
                  height="80"
                  elevation="0"
                  color="black"
                  dark
                  class="d-flex align-center justify-center pa-1">
                    {{comment.text}}
                  </v-card>
                </v-col>
                <v-col
                cols="2">
                  <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-card-text>
        </v-card>
        <v-col
        cols="10">
          <v-text-field
          label="Введите комментарий"
          v-model="comment"
          color="#e3874f"
          dark
          append-outer-icon="mdi-send"
          @click:append-outer="postComment"
          @keyup.enter="postComment"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'viewPost',

    data: () => ({
     comment: '',
    }),

    computed: {
     ...mapGetters(['POST', 'COMMENTS']),
    },

    methods: {
     ...mapActions(['GET_POST', 'CREATE_COMMENT']),
     postComment() {
      let payload = {
       comment: {
       user: 'userName',
       text: this.comment
      },
      url: 'posts/' + this.POST.id + '/comment'
      }
      this.CREATE_COMMENT(payload)
      .then(() => {
       const url = 'posts/' + this.POST.id
       this.GET_POST(url)
       this.comment = ''
      })
     }
    },

    mounted() {
     const url = 'posts/' + this.$route.params.id
     this.GET_POST(url)
    }
  }

</script>

<style>
 .avatar {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
</style>