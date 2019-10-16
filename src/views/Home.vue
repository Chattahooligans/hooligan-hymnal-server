<template>
  <Layout>
    <div class="text-center container mx-auto py-3">
      <h1 class="font-bold text-3xl">Welcome to Hymnal Server</h1>
      <fragment v-if="loggedIn">
        <p>If you see nothing on the side please contact your admin.</p>
      </fragment>
    </div>
  </Layout>
</template>

<script>
import NProgress from "nprogress";
import { authComputed } from "@/vuex/helpers";

export default {
  name: "home",
  components: {},
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start();
    NProgress.done();
    next();
  },
  computed: {
    ...authComputed
  }
};
</script>
