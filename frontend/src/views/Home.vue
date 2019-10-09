<template>
  <Layout>
    <div class="home">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
  </Layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Layout from "@/layouts/Layout";
import NProgress from "nprogress";

export default {
  name: "home",
  components: {
    HelloWorld,
    Layout
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    NProgress.done();
    next();
  }
};
</script>
