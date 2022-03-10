<template>
  <div class="home">
    <Header />
    <CheckBMI />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "../components/Header/index.vue";
import CheckBMI from "../components/CheckBMI/index.vue";

export default {
  name: "HomeView",
  components: { Header, CheckBMI },
};
</script>
