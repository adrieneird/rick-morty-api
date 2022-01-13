const searchStore = {
    state: () => ({
        searchName: "",
		searchFilter: false,
		searchStatus: "",
    }),
    mutations: {
        setSearchName(state, searchName) {
            state.searchName = searchName;
        },
		setSearchFilter(state, searchFilter) {
            state.searchFilter = searchFilter;
        },
		setSearchStatus(state, searchStatus) {
            state.searchStatus = searchStatus;
        },
    },
    getters: {
        getSearchName(state) {
            return state.searchName;
        },
		getSearchFilter(state) {
            return state.searchFilter;
        },
		getSearchStatus(state) {
            return state.searchStatus;
        },
    },
};

export default searchStore;