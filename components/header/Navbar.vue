<template>
  <header class="bg-dark">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark container justify-content-between">
      <nuxt-link
        class="navbar-brand"
        to="/"
      >Auth0 Sample</nuxt-link>
      <div class="d-flex">
        <ul class="navbar-nav">
          <li class="nav-item">
            <nuxt-link
              to="/about"
              class="nav-link"
            >About</nuxt-link>
          </li>
        </ul>
        <button
          v-if="!isAuthenticated"
          @click="login"
          class="btn btn-outline-success mr-2"
        >Login</button>
        <button
          v-if="isAuthenticated"
          @click="logout"
          class="btn btn-outline-danger"
        >Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from "vuex";
import auth0 from "@/services/AuthService";

export default {
  computed: {
    ...mapState("auth", ["isAuthenticated"])
  },
  methods: {
    login() {
      auth0.login();
    },
    logout() {
      auth0.logout();
    }
  }
};
</script>
