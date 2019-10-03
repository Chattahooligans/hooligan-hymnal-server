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

export default {
  name: "home",
  components: {
    HelloWorld,
    Layout
  }
};
</script>
