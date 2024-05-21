import axios from "axios";

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },
  mutations: {
    addRequest(state, requests) {
      state.requests = requests;
    },
  },
  actions: {
    fetchContact({ commit }, id) {
      return axios
        .get(`http://localhost:3000/api/getContact/${id}`)
        .then((response) => {
          const requests = response.data.map((request) => ({
            ...request,
          }));
          commit("addRequest", requests);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async contactCoach({ commit }, requestData) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/contactCoach",
          requestData
        );
        commit("addRequest", response.data);
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    // contactCoach(context, payload) {
    //   const newRequest = {
    //     id: new Date().toISOString(),
    //     coachId: payload.coachId,
    //     userEmail: payload.email,
    //     message: payload.message,
    //   };
    //   context.commit("addRequest", newRequest);
    // },
  },
  getters: {
    requests(state) {
      return state.requests;
    },
    hasRequests(state) {
      return state.requests && state.requests.length > 0;
    },
    // requests(state, _, _2, rootGetters) {
    //   const coachId = rootGetters.userId;
    //   return state.requests.filter((req) => req.coachId === coachId);
    // },
    // hasRequests(_, getters) {
    //   console.log(getters);
    //   return getters.requests && getters.requests.length > 0;
    // },
  },
};
