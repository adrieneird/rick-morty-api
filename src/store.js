import { createStore } from 'vuex'

// Stores
import pagesStore from './stores/pages.js';
import searchStore from './stores/search.js';
import characters from './stores/characters.js';

const store = createStore({
	modules: {
		pagesStore,
		searchStore,
		characters,
	},
});

export default store;