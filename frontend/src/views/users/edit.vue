<template>
  <Layout>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="message">
      {{ message }}
    </div>
    <div v-else>
      <h2>Edit {{ user.email }}</h2>
      <UserForm
        :user="user"
        :edit="true"
        :formMethod="updateUser"
        :cancel="back"
      />
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import UserForm from "@/forms/UserForm";
import axios from "axios";
export default {
  components: {
    Layout,
    UserForm
  },
  data() {
    return {
      loading: false,
      message: "",
      user: {}
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      const { id } = this.$route.params;
      axios
        .get(`/api/users/${id}`)
        .then(({ data }) => {
          this.user = data;
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    updateUser() {
      axios.put(`/api/users/${this.user._id}`, this.user).then(() => {
        this.router
          .push(`/users/${this.user._id}`)
          .catch(err => console.log(err.response));
      });
    },
    back() {
      this.router.go(-1);
    }
  }
};
</script>

<style></style>
