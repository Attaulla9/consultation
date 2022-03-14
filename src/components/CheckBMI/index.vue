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
          mt-4
          mx-auto
        "
      >
        <label
          v-for="(item, value, index) in AllSlots"
          :key="index"
          :value="value"
          class="
            radio-group
            px-4
            py-2
            m-2
            shadow-md
            rounded
            text-sky-800
            border-2 border-sky-600
            mx-auto
          "
          :class="checked == value ? 'bg-sky-100' : 'bg-white'"
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
        </label>
      </div>
      <p class="text-center text-sky-800 font-bold space-x-2"><span class="inline-block">{{ checked }}</span><span class="text-sky-700 inline-block"> {{selectedTime}}</span></p>

      <div
        class="
          mt-6
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
          class="
            py-2
            px-4
            rounded
            shadow-lg
            border-2 border-sky-300
            font-medium
            focus:bg-sky-800 focus:text-white focus:border-white
          "
          v-for="(slot, index) in AllSlots[checked]"
          :key="index"
          @click="getTime(slot.slot)"
          :class="
            slot.colour == 'yellow'
              ? ['bg-white', 'text-sky-600']
              : ['bg-yellow-200', 'text-sky-800']
          "
        >
          {{ slot.slot }}
        </button>
      </div>

      <div class="px-2 mb-20 mt-10 flex flex-row justify-center space-x-2">
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 bg-yellow-300"></span><span>Fast Filling</span>
        </p>
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 bg-red-300"></span><span>Fast Filling</span>
        </p>
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 border-2 border-sky-800"></span
          ><span>Fast Filling</span>
        </p>
      </div>
      <div
        class="
          fixed
          bottom-0
          left-0
          w-full
          p-1
          border-t-4
          bg-white
          border-sky-100
          shadow-lg
          text-center
        "
      >
        <button
          class="py-2 font-semibold px-12 bg-sky-600 text-white rounded-md"
        >
          Book
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
      selectedTime: "",
      checked: "",
    };
  },
  watch:{
    checked(){
      this.selectedTime=''
      
    }
  },
  computed: {
    dateFormate(value) {
      return (value) => {
        let arrOfDate = [];
        let val = value.split("-");
        let todayDate = new Date(value);
        let todayDay = todayDate.getDay();
        let daysName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        console.log(daysName[todayDay]);
        arrOfDate.push(daysName[todayDay]);
        arrOfDate.push(val[2]);
        arrOfDate.push(val[0]);

        return arrOfDate;
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
      this.selectedTime = e;
      // console.log(this.selectedTime);
    },
  },
};
</script>


<style scoped>
.active {
  background: red;
}
</style>