<template>
  <div class="home">
    <Header />
    <Slot />
    <!-- <Test /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header/index.vue";
import Slot from "../components/Slot/index.vue";
// import Test from "../components/Test/index.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Slot,
    // Test,
  },
};
</script>
