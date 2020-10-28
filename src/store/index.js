import Vue from 'vue'
import Vuex from 'vuex'

import files from "@/store/modules/files";
import documents from "@/store/modules/documents";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    files,
    documents
  }
})