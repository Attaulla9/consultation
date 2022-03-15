<template>
  <div class="md:w-2/4 mx-auto space-y-4">
    <div class="heading text-center mt-4 space-y-2">
      <h1 class="text-2xl font-semibold">
        Book Your <span class="text-red-400">Free</span> Consultation
      </h1>
      <p>( 30 minutes consultation )</p>
      <p>Please Select Date & Time</p>
    </div>
    <div v-if="loading">
      <div class="md:w-1/2 grid grid-cols-4 text-center py-2 mx-auto">
        <label
          v-for="(item, value, index) in AllSlots"
          :key="index"
          :value="value"
          class="
            radio-group
            px-4
            py-2
            shadow
            rounded
            text-sky-800
            border-2 border-sky-600
            mx-auto
            transition
            ease-in
            delay-150
            duration-200
          "
          :class="checked == value ? 'bg-sky-100' : 'bg-white'"
        >
          <input
            type="radio"
            :id="'data' + index"
            name="data-slot"
            class="cursor-pointer hidden"
            :value="value"
            v-model="checked"
          />
          <p v-for="(item, index) in dateFormate(value)" :key="index">
            {{ item }}
          </p>
        </label>
      </div>
      <p class="text-center text-sky-800 font-bold space-x-2 my-4">
        <span class="inline-block">{{ checked }}</span
        ><span class="text-sky-700 inline-block"> {{ selectedTime }}</span>
      </p>

      <div class="grid md:grid-cols-6 grid-cols-3 gap-3 px-2 mx-auto">
        <button
          class="
            transition-all
            duration-250
            ease-in-out
            p-2
            rounded
            shadow shadow-gray-400
            font-medium
            focus:bg-sky-800 focus:text-white focus:border-white
          "
          v-for="(slot, index) in AllSlots[checked]"
          :key="index"
          @click="getTime(slot.slot)"
          :class="
            slot.colour == 'yellow'
              ? ['bg-yellow-200', 'text-sky-600']
              : ['bg-white', 'text-sky-800']
          "
        >
          {{ slot.slot }}
        </button>
      </div>

      <div
        class="px-2 flex flex-row justify-center space-x-2 mt-6 mb-28 md:mb-6"
      >
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 bg-yellow-200"></span><span>Filling Fast</span>
        </p>
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 bg-red-500"></span><span>Filled</span>
        </p>
        <p class="flex justify-center items-center space-x-2">
          <span class="h-5 w-5 border-2 border-sky-800"></span
          ><span>Available</span>
        </p>
      </div>
      <div
        class="
          fixed
          md:static
          bottom-0
          left-0
          w-full
          p-1
          border-t-4
          md:border-0
          bg-white
          border-sky-100
          md:shadow-none
          shadow-lg
          text-center
        "
      >
        <button
          class="py-2 font-semibold px-12 bg-sky-800 text-white rounded-md"
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
      <svg
        role="status"
        class="
          mr-2
          w-16
          h-16
          text-gray-200
          animate-spin
          dark:text-gray-600
          fill-blue-400
        "
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
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
  watch: {
    checked() {
      this.selectedTime = "";
    },
  },
  computed: {
    dateFormate(value) {
      return (value) => {
        //2022-03-15
        let arrOfDate = [];
        let val = value.split("-");
        let todayDate = new Date(value);
        let todayDay = todayDate.getDay();
        let daysName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        // console.log(daysName[todayDay]);
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
    let day = dt.getDate().toString().padStart(2, "0");
    // time
    let today = year + "-" + month + "-" + day;
    this.checked = today;
    console.log(this.checked);
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
    },
  },
};
</script>


<style scoped>
</style>