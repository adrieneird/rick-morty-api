import { createStore } from 'vuex'

// Stores
import currentPage from './stores/currentPage.js';

const store = createStore({
	modules: {
		currentPage,
	},
});

export default store;