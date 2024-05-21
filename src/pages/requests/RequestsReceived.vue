<template>
  <section>
    <base-card>
      <header>
        <h2>Please select a coach</h2>
      </header>
      <ul class="coach-items">
        <li v-for="coach in fetchCoachList" :key="coach.id" class="coach-item">
          <router-link :to="'/requests/' + coach.id" class="coach-link">{{ coach.id }}. {{ coach.firstName }} {{
          coach.lastName
        }}</router-link>
        </li>
      </ul>
    </base-card>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      coaches: []
    }
  },
  computed: {
    // receivedRequests() {
    //   return this.$store.getters['requests/requests'];
    // },
    fetchCoachList() {
      return this.$store.getters['coaches/coachId'];
    },
  },
  methods: {
    ...mapActions('coaches', ['GetCoachId']),
  },
  mounted() {
    this.GetCoachId();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}

h2 {
  color: maroon
}

.coach-list {
  max-width: 600px;
  margin: 0 auto;
}

.coach-items {
  list-style: none;
  padding: 0;
}

.coach-item {
  margin-bottom: 10px;
}

.coach-link {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

.coach-link:hover {
  color: #007bff;
}
</style>