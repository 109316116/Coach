<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach out now!</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge v-for="area in areas" :key="area" :type="area" :title="area"></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: ['id'],
  data() {
    return {};
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch('coaches/fetchCoaches');
    }
  },
  computed: {
    ...mapGetters('coaches', ['coaches']),
    fullName() {
      if (this.selectedCoach)
        return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },
    areas() {
      if (this.selectedCoach)
        return this.selectedCoach.areas;
    },
    rate() {
      if (this.selectedCoach)
        return this.selectedCoach.hourlyRate;
    },
    description() {
      if (this.selectedCoach)
        return this.selectedCoach.description;
    },
    contactLink() {
      if (this.$route.path.endsWith('/contact')) {
        return this.$route.path;
      } else {
        return this.$route.path + '/contact';
      }
    },
    selectedCoach() {
      return this.coaches.find((coach) => coach.id == this.id);
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    }
  },
  async created() {
    // 判斷如果沒有 caoches 的話，get 資料
    if (this.hasCoaches === false) {
      try {
        await this.fetchData();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
  }
};
</script>