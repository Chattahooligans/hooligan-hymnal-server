<template>
  <Layout>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="user.email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
        />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <div>
      <router-link to="/register"
        >Don't have an account. Register for one here</router-link
      >
    </div>
  </Layout>
</template>

<script>
// import { mapActions } from "vuex";
import Layout from "@/layouts/Layout";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    Layout
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          this.$router.push("/");
        });
    }
  },
  computed: {}
};
</script>
