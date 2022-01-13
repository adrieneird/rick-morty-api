const currentPageStore = {
    state: () => ({
        currentPage: 1,
    }),
    mutations: {
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },
    },
    getters: {
        getCurrentPage(state) {
            return state.currentPage;
        },
    },
    actions: {
        setCurrentPage({ commit }, currentPage) {
            commit('setCurrentPage', currentPage.data);
        },
    },
};

export default currentPageStore;