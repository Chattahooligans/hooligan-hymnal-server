<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <template v-if="!loggedIn">
        <router-link :to="{ name: 'login' }">Login</router-link>
      </template>
      <template v-else>
        <a href="#" @click.prevent="logout()">Logout</a>
      </template>
    </div>
    <div style="display:flex;flex-direction:row">
      <template v-if="loggedIn">
        <aside>
          <nav style="display:flex; flex-direction:column">
            <router-link to="/songs">Songs</router-link>
            <router-link to="/">Song Book</router-link>
            <router-link to="/">Players</router-link>
            <router-link to="/">Roster</router-link>
            <router-link to="/">Goalkeeper Nickname</router-link>
            <router-link to="/">Foes</router-link>
            <router-link to="/users">Users</router-link>
          </nav>
        </aside>
      </template>
      <main>
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.token;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
