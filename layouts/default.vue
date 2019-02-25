<template>
  <div>
    <Header/>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
const Header = () => import("@/components/header/Header");
export default {
  components: {
    Header
  },
  middleware: ["check-auth"]
};
</script>
