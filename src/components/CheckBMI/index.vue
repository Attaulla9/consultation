<template>
  <div class="md:w-2/3 mx-auto">
    <div v-if="loading">
      <div
        class="
          md:w-1/2
          grid grid-cols-4
          text-center
          gap-4
          px-2
          py-2
          mt-10
          mx-auto
        "
      >
        <label
          v-for="(item, value, index) in AllSlots"
          :key="index"
          :value="value"
          class="radio-group px-4 py-2 m-2 shadow rounded"
          :class="checked == value ? 'bg-green-400' : 'bg-indigo-200'"
        >
          <input
            type="radio"
            :id="'data' + index"
            name="data-slot"
            class="py-2 px-4 rounded shadow cursor-pointer hidden"
            :value="value"
            v-model="checked"
          />
          <p v-for="(item, index) in dateFormate(value)" :key="index">
            {{ item }}
          </p>
          <!-- {{ dateFormate(value) }} -->
        </label>
      </div>

      <div
        class="
          mt-10
          grid
          md:grid-cols-6
          grid-cols-3
          gap-3
          px-2
          mx-auto
          transform
          transition-all
          duration-700
          ease-in
        "
      >
        <button
          class="py-2 px-4 rounded shadow-md"
          v-for="(slot, index) in AllSlots[checked]"
          :key="index"
          @click="getTime(slot.slot)"
          :class="slot.colour == 'yellow' ? 'bg-green-200' : 'bg-yellow-300'"
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
  computed: {
    dateFormate(value) {
      return (value) => {
        let arrOfDate = [];
        let val = value.split("-");
        val.map((element, index) => {
          var weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          if (index == 1) {
            element = weekDays[index];
          }
          arrOfDate.push(element);
        });
        console.log(arrOfDate);
        return val;
      };
    },
  },
  mounted() {
    var dt = new Date();
    let year = dt.getFullYear();
    let month = (dt.getMonth() + 1).toString().padStart(2, "0");
    let day = (dt.getDate() + 1).toString().padStart(2, "0");
    let day1 = dt.getDate().toString().padStart(2, "0");
    // time
    var time = dt.getHours();
    var minute = dt.getMinutes();
    var timeToCheck = time + ":" + minute;
    if (timeToCheck < "19:30") {
      let today = year + "-" + month + "-" + day1;
      this.checked = today;
    } else {
      let today = year + "-" + month + "-" + day; 
      this.checked = today;
    }
    // console.log(this.checked);
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
    getTime(e) {
      console.log(e);
    },
  },
};
</script>


<style scoped>
.active {
  background: red;
}
</style>