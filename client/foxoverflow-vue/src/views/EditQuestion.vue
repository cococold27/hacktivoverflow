<template>
  <v-container
    style="width: 55%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem; margin-top: 3%;"
  >
    <v-form @submit.prevent="submitUpdateQuestion">
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <h4>Title:</h4>
          <v-text-field v-model="title" placeholder="" required style="margin: 0; padding: 0;"></v-text-field>
        </v-flex>

        <v-flex xs12 mb-4>
          <h4 class="mb-2">Tags:</h4>
          <tags-input
            element-id="tags"
            v-model="selectedTags"
            :typeahead="true"
          ></tags-input>
        </v-flex>

        <v-flex xs12>
          <h4 class="mb-2">Description:</h4>
          <wysiwyg v-model="description"/>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="my-2">
          <v-btn color="info" type="submit" style="margin-left: 0;">Submit Question</v-btn>
          <v-btn color="error" style="margin-left: 0;" flat to="/">Cancel</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    title: "",
    description: "",
    questionId: "",
    selectedTags: [],
  }),
  created() {
    this.getCurrentQuestion(this.$route.params.id);  
    this.title = this.currentQuestion.title;
    this.description = this.currentQuestion.description;
    this.selectedTags = this.currentQuestion.tags;
    this.questionId = this.currentQuestion._id;
  },
  methods: {
    ...mapActions(["getCurrentQuestion"]),
    submitUpdateQuestion() {
      const { title, description, selectedTags } = this;
      const questionData = { 
        title, 
        description, 
        tags: selectedTags 
      };

      axios({
        method: "PUT",
        url: `/questions/${this.questionId}`,
        data: questionData,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);

          this.title = "";
          this.description = "";
          this.$router.push("/");

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Question updated"
          });
        })
        .catch(err => {
          // console.log(err.response);
          // console.log(err.response.data.message);

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  },
  computed: {
    ...mapState(["currentQuestion"])
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.v-messages__message {
  margin-top: 1rem;
}

.v-text-field .v-input__prepend-inner {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
