<template>
  <div>
    <Navbar />
  </div>
</template>

<script>
const Navbar = () => import("@/components/header/Navbar");
export default {
  components: {
    Navbar
  }
};
</script>
