<template>
  <router-view />
</template>

<script>
// import Sidebar from "./components/Sidebar";
import { mapActions, mapGetters } from "vuex";
export default {
  // mounted () {
  //   ;
  // },
  // data() {
  //   return {
  //     myWidget: cloudinary.createUploadWidget(
  //       {
  //         cloudName: "dlln4aygi"
  //       },
  //       (error, result) => {
  //         if (!error && result && result.event === "success") {
  //           console.log(result.info);
  //         }
  //       }
  //     )
  //   };
  // },
  methods: {
    ...mapActions(["logout"])
  },
  computed: {},
  metaInfo: {
    title: "Hymnal Server"
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
