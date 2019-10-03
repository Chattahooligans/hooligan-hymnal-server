<template>
  <Layout>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      {{ user.email }}
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      loading: false,
      message: "",
      user: {}
    };
  },
  created() {
    this.getUser();
  },
  components: {
    Layout
  },
  methods: {
    getUser() {
      this.loading = true;
      const { id } = this.$route.params;
      this.$axios.get(`/api/users/${id}`).then(({ data }) => {
        this.loading = false;
        if (data.message) {
          this.message = data.message;
        } else {
          this.user = data;
        }
      });
    }
  }
};
</script>

<style></style>
