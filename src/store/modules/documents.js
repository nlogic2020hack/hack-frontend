export default {
  actions: {
    async fetchDocument(ctx, id) {
      const res = await fetch(
        process.env.VUE_APP_BASE_URL + '/documents/' + id
      );
      const document = await res.json();
      ctx.commit('updateDocument', document.result)
      ctx.commit('updatePages', document.result.pages)
    }
  },
  mutations: {
    updateDocument(state, document) {
      state.document = document
    },
    updatePages(state, pages) {
      state.pages = pages
    }
  },
  state: {
    document: null,
    pages: [],
  },
  getters: {
    currentDocument(state) {
      return state.document
    },
    currentPages(state) {
      return state.pages
    }
  }
}