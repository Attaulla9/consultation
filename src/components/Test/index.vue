<template>
  <div class="md:w-2/3 mx-auto">
    <div v-if="loading">
      <div class="flex flex-wrap gap-4 mt-10 px-2 justify-center">
        <div
          class="radio-group"
          v-for="(item, value, index) in AllSlots"
          :key="index"
          :value="value"
        >
          <input
            type="radio"
            :id="'data' + index"
            name="data-slot"
            class="py-2 px-4 rounded shadow cursor-pointer"
            :value="value"
            v-model="checked"
          />
          <label :for="'data' + index">{{ value }} </label>
        </div>
      </div>
      <p>{{ AllSlots[checked] }}</p>
      <!-- <div  v-for="(item, value, index) in AllSlots[checked]" :key="index">
        <p>{{item}}</p>
      </div> -->
    </div>
    <div
      v-else
      class="
        absolute
        transform
        -translate-x-1/2 -translate-y-1/2
        top-1/2
        left-1/2
      "
    >
      <p>Fetching...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      AllSlots: "",
      Timeslots: "",
      checked: "",
    };
  },
  mounted() {
    var dt = new Date();

    let year = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day = dt.getDate().toString().padStart(2, "0");

    const today=year + "-" + month + "-" + day;
    this.checked=today
  },

  async created() {
    this.fetchdata();
  },
  methods: {
    async fetchdata() {
      const res = await axios
        .get("https://billing.truweight.in/get_time_slot_status")
        .then((res) => {
          this.AllSlots = res.data.data;
          this.loading = true;
        });
    },
  },
};
</script>

<style scoped>
.active {
  background: red;
}
</style>