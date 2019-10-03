<template>
  <Layout>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      <h2>Insert User Edit Form here</h2>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  components: {
    Layout
  },
  data() {
    return {
      loading: false,
      message: "",
      user: {}
    };
  }
};
</script>

<style></style>
