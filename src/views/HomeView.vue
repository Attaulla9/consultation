<template>
  <div class="home">
    <Header />
    <CheckBMI />
    <!-- <Test /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header/index.vue";
import CheckBMI from "../components/CheckBMI/index.vue";
// import Test from "../components/Test/index.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    CheckBMI,
    // Test,
  },
};
</script>
