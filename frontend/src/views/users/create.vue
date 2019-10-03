<template>
  <Layout>
    <h2>Create User</h2>
    <h3>Insert user create form here</h3>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      user: {
        email: ""
      }
    };
  },
  components: {
    Layout
  }
};
</script>

<style></style>
