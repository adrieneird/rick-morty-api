const searchStore = {
    state: () => ({
        searchName: "",
		searchFilter: false,
		searchStatus: "",
    }),
    mutations: {
        setSearchName(state, { searchName }) {
            state.searchName = searchName;
        },
		setSearchFilter(state, { searchFilter }) {
            state.searchFilter = searchFilter;
        },
		setSearchStatus(state, { searchStatus }) {
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
	actions: {
		setSearch({ commit }, { searchName, searchFilter, searchStatus }) {
			commit('setSearchName', { searchName });
			commit('setSearchFilter', { searchFilter });
			commit('setSearchStatus', { searchStatus });
			
			// Clear current store since it'll mess up pages
			commit('clearCharacters');
		},
	},
};

export default searchStore;