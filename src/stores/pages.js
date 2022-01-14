const pagesStore = {
    state: () => ({
        currentPage: 1,
		lastPage: 1,
    }),
    mutations: {
        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },
		setLastPage(state, lastPage) {
            state.lastPage = lastPage;
        },
    },
    getters: {
        getCurrentPage(state) {
            return state.currentPage;
        },
		getLastPage(state) {
            return state.lastPage;
        },
    },
};

export default pagesStore;