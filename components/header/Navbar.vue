<template>
  <header class="bg-dark">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark container justify-content-between">
      <a
        class="navbar-brand"
        href="#"
      >Auth0 Sample</a>
      <div>
        <button
          @click="login"
          class="btn btn-primary mr-2"
        >Login</button>
        <button
          @click="logout"
          class="btn btn-danger"
        >Logout</button>
      </div>
    </nav>
  </header>

</template>

<script>
import auth0 from "@/services/AuthService";

export default {
  methods: {
    login() {
      auth0.login();
    },
    logout() {}
  }
};
</script>
