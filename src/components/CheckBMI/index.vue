<template>
  <div class="">
    <!-- <p>Check BMI</p> -->
    <div v-if="loading">
      <div class="md:w-9/12 grid grid-cols-2 gap-4 px-2 py-2 mt-10 mx-auto">
        <button
          class="py-2 px-4 bg-blue-200 rounded-lg text-center font-bold"
          v-for="(item, name, index) in timeSlot"
          :key="index"
          :class="{ 'bg-green-300': index === 0 }"
          @click="selectdate(item, name)"
          :selectedValue="{ name: index == 0 }"
        >
          {{ name  }}
        </button>
      </div>

      <div class="md:w-3/4 grid grid-cols-3 gap-3 px-2 mx-auto">
        <button
          class="py-2 px-4 rounded shadow-md"
          @click="getTime(slot.slot)"
          v-for="(slot, index) in slots"
          :class="slot.colour == 'yellow' ? 'bg-yellow-400' : 'bg-green-200'"
          :key="index"
        >
          {{ slot.slot }}
        </button>
      </div>
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
      <p class="">Fetching...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      selectedValue: "",
      timeSlot: "",
      slots: "",
      selectedData: "",
      selectedTime: "",
    };
  },
  async created() {
    this.fetchdata();
  },
  filters: {
    capitalize: function (value) {
     
      return value;
    },

    // splitdata(value) {
    //   value;
    // },
  },

  methods: {
    async fetchdata() {
      const res = await axios
        // .get("https://billing.truweight.in/get_time_slot_status")
        .get("https://billing.truweight.in/get_time_slot_status")

        .then((res) => {
          this.timeSlot = res.data.data;
          this.loading = true;
        });
    },
    selectdate(item, name) {
      // console.log(item);
      this.slots = item;
      this.selectedData = name;
      console.log(name);
    },
    getTime(e) {
      console.log(e);
      this.selectedTime = e;
    },
  },
};
</script>

<style scoped>
.active {
  background: red;
}
</style>