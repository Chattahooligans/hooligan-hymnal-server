<template>
  <Layout>
    <h2>Register</h2>
    <form method="POST" @submit.prevent="register">
      <div>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="user.email" />
      </div>
      <div>
        <label for="email_confirm">Email Confirm</label>
        <input
          type="email"
          name="email_confirm"
          id="email_confirm"
          v-model="user.email_confirm"
        />
      </div>
      <div>
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          id="passsword"
          v-model="user.password"
        />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <div>
      <router-link to="/login"
        >Already have an account, please login</router-link
      >
    </div>
  </Layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        email_confirm: "",
        password: ""
      }
    };
  },
  components: {
    Layout
  },
  computed: {
    isMatch() {
      return this.user.email == this.user.email_confirm;
    }
  },
  methods: {
    register() {
      if (this.isMatch) {
        this.$store
          .dispatch("register", {
            email: this.user.email,
            password: this.user.password
          })
          .then(() => {
            this.$router.push("/login");
          });
      } else {
        alert("The email addresses do not match");
      }
    }
  }
};
</script>

<style></style>
