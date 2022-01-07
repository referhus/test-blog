<template>
  <v-app id="inspire">
    <v-app-bar app
    color="#886a4a"
    elevation="1">
      <v-toolbar-title><v-btn color="transparent" :to="{path:'/'}">КУЛИНАРНЫЙ БЛОГ</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
            v-on="on"
            icon
            >
            <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <v-list
          color="black">
            <v-list-item>
              <v-list-item-title>User: userName</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main class="bg">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
<script>
</script>
<style>
* {
  color: #fff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.bg {
  background: #707070
}

</style>
