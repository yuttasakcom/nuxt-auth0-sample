<template>
  <div>
    <p>Verifying login data ...</p>
  </div>
</template>

<script>
import auth0Client from "@/services/AuthService";

export default {
  async mounted() {
    await auth0Client.handleAuthentication();
    this.$router.push("/");
  }
};
</script>
