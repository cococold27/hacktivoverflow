import Vue from 'vue'
import Vuex from 'vuex'

import axios from "@/api/axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    allQuestions: [],
    allUserQuestions: [],
    currentQuestion: {},
    fullName: "",
    currentPage: "FoxOverflow",
    keyword: "",
  },
  mutations: {
    login (state) {
      state.isLoggedIn = true;
    },
    logout (state) {
      state.isLoggedIn = false;
    },
    setFullName(state) {
      state.fullName = localStorage.fullName;
    },
    clearAllQuestions(state) {
      state.allQuestions = [];
    },
    setAllQuestions(state, payload) {
      state.allQuestions = payload;
    },
    setUserQuestions(state, payload) {
      state.allUserQuestions = payload;
    },
    setCurrentQuestion(state, payload) {
      state.currentQuestion = payload;
    },
    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },
    updateKeyword(state, payload) {
      state.keyword = payload;
    }
  },
  actions: {
    getAllQuestions(context) {
      axios({
        method: "GET",
        url: `/questions`,
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setAllQuestions", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUserQuestions(context) {
      axios({
        method: "GET",
        url: `/questions/user`,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setUserQuestions", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCurrentQuestion(context, id) {
      axios({
        method: "GET",
        url: `/questions/${id}`,
      })
        .then(({ data }) => {
          console.log(data);
          context.commit("setCurrentQuestion", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    test(context) {
      console.log("invoked")
    }
  }
})
