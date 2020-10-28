export default {
    actions: {
        async fetchFiles(ctx) {
            const res = await fetch(
              process.env.VUE_APP_BASE_URL + '/files'
            );
            const files = await res.json();
            ctx.commit('updateFiles', files.result)
        },
        postFile(ctx) {

        }
    },
    mutations: {
        updateFiles(state, files) {
            state.files = files
        }
    },
    state: {
        files: [],
    },
    getters: {
        allFiles(state) {
            return state.files
        }
    }
}