<template>
  <div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/api/users/login", this.user)
        .then(({ data }) => {
          const { token } = data;
          localStorage.setItem("token", token);
          this.$router.push("/");
        })
        .catch(res => console.log(res));
    }
  },
  computed: {}
};
</script>
