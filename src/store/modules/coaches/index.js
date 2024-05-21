import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
      coachId: [],
    };
  },
  mutations: {
    setCoaches(state, coaches) {
      state.coaches = coaches;
    },
    setCoachId(state, coachId) {
      state.coachId = coachId;
    },
  },
  actions: {
    fetchCoaches({ commit }) {
      return axios
        .get("http://localhost:3000/api/getCoach")
        .then((response) => {
          const coaches = response.data.map((coach) => ({
            ...coach,
            areas: JSON.parse(coach.areas),
          }));
          commit("setCoaches", coaches);
        })
        .catch((error) => {
          console.error("Error fetching coaches:", error);
        });
    },

    GetCoachId({ commit }) {
      return axios
        .get("http://localhost:3000/api/getCoachId")
        .then((response) => {
          const coachId = response.data.map((coach) => ({
            ...coach,
          }));
          commit("setCoachId", coachId);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async registerCoach({ commit }, coachData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/registerCoach",
          coachData
        );
        commit("setCoaches", response.data);
        console.log("Coach registered:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error registering coach:", error);
        throw error;
      }
    },
  },

  getters: {
    coaches(state) {
      return state.coaches;
    },
    coachId(state) {
      return state.coachId;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some((coach) => coach.id === userId);
    },
  },
};
