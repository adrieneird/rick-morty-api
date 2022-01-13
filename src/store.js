import { createStore } from 'vuex'

// Stores
import currentPageStore from './stores/currentPage.js';
import searchStore from './stores/search.js';
import characters from './stores/characters.js';

const store = createStore({
	modules: {
		currentPageStore,
		searchStore,
		characters,
	},
});

export default store;