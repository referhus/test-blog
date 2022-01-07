<template>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';

  export default {
    name: 'post',

    data: () => ({
      post: null,
      upd: false,
      title: '',
      text: ''
    }),

    computed: {
     ...mapGetters(['POSTS']),
    },

    methods: {
  }

</script>

<style>
  .img {
    width: 80%;
    height: 150px;
  }

  .post {
    width: 95%;
  }

  .hover-post {
    border: 1px solid transparent;
    transition: all 0.3s linear
  }

  .hover-post:hover {
    border: 1px solid #8B0000
  }

  .more {
    cursor: pointer;
    transition: all 0.3s linear;
  }

  .more:hover {
    color: grey;
    font-weight: bold;
  }
</style>
