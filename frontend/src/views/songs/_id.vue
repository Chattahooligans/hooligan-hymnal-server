<template>
  <Layout>
    <div v-if="message">
      {{ message }}
    </div>
    <h2>{{ song.title }}</h2>
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
      message: "",
      song: {}
    };
  },
  mounted() {
    this.getSong();
  },
  methods: {
    getSong() {
      const { id } = this.$route.params;
      this.$axios
        .get(`/api/song/${id}`)
        .then(res => {
          if (res.data.message) {
            this.message = res.data.message;
          } else {
            this.song = res.data;
          }
        })
        .catch(({ response }) => {
          if (response.status === 401) {
            localStorage.removeItem("token");
            this.$router.push({
              path: "/login"
            });
          }
        });
    }
  }
};
</script>

<style></style>
