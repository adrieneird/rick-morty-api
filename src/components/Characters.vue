<template>
	<div id="searchbar">
		<input v-model="searchName" type="search" placeholder="rick, morty, jerry, etc" />
		<button @click="currentPage=1; storeSetCurrentPage(); storeSetSearch(); loadPage();">Search</button>
		<div>
			<input v-model="searchFilter" type="checkbox" id="search-filter" /> <label for="search-filter">Filter</label>
		</div>
		<select v-model="searchStatus">
			<option value="">any</option>
			<option value="alive">alive</option>
			<option value="dead">dead</option>
			<option value="unknown">unknown</option>
		</select>
	</div>
	<div id="characters">
		<template v-for="character in characters" :key="character.id">
			<router-link :to="{ name: 'Character', params: { id: character.id }}">
				<div >
					<img :src="character.image" />
					{{ character.name }}
				</div>
			</router-link>
		</template>
	</div>
	<paginator v-model="currentPage" :last-page="storeLastPage" @update:modelValue="storeSetCurrentPage(); loadPage();" />
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import Paginator from './Paginator.vue'

export default {
	name: 'Characters',
	components: {
		Paginator,
	},
	setup() {
		// Store
		
		const store = useStore();
		
		const storeCurrentPage = computed(() => store.getters.getCurrentPage);
		const storeLastPage = computed(() => store.getters.getLastPage);
		
		const storeSearchName = computed(() => store.getters.getSearchName);
		const storeSearchFilter = computed(() => store.getters.getSearchFilter);
		const storeSearchStatus = computed(() => store.getters.getSearchStatus);
		
		const storeCharacters = computed(() => store.getters.getCharactersByPage(storeCurrentPage.value, storeSearchName.value, storeSearchFilter.value, storeSearchStatus.value));
		const storeCharactersCount = computed(() => store.getters.getCharactersByPage(storeCurrentPage.value, storeSearchName.value, storeSearchFilter.value, storeSearchStatus.value));
	
		// Refs
	
		const characters = ref([]);
		const currentPage = ref(storeCurrentPage.value); // Keeping this as the v-model of the paginator to make it reusable
		// Search related
		const searchName = ref(storeSearchName.value);
		const searchFilter = ref(storeSearchFilter.value);
		const searchStatus = ref(storeSearchStatus.value);
	
		// Functions
	
		const storeSetCurrentPage = () => {
			store.commit('setCurrentPage', currentPage.value);
		};
	
		const storeSetSearch = () => {
			store.commit('setSearchName', searchName.value);
			store.commit('setSearchFilter', searchFilter.value);
			store.commit('setSearchStatus', searchStatus.value);
			
			// Clear current store since it'll mess up pages
			store.commit('clearCharacters');
		};
	
		// Relies on a simple fetch instead of axios
		const loadPage = async () => {
			let urlQuery = "";
			if (storeSearchName.value) {
				urlQuery += `&name=${storeSearchName.value}`;
			}
			if (storeSearchFilter.value && storeSearchStatus.value) {
				urlQuery += `&status=${storeSearchStatus.value}`;
			}
			
			if ((storeCharactersCount.value < 20 && storeCurrentPage.value !== storeLastPage.value) || (storeCurrentPage.value === storeLastPage.value)) {
				// Less than 20 characters and not on last page => must fetch
				// Last page, can't know length => must fetch
				
				const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${storeCurrentPage.value}${urlQuery}`);
				const responseJson = await response.json();
				
				store.commit('addCharacters', { characters: responseJson.results, page: storeCurrentPage.value });
				
				// In case of change in the query, the last page number must be updated
				store.commit('setLastPage', responseJson.info.pages);
				
				characters.value = responseJson.results;
			} else {
				// 20 characters and not on last page => no need to fetch
				
				characters.value = storeCharacters.value;
			}
		};
		
		onMounted(() => {
			// First load
			loadPage();
		});
		
		return {
			// Store
			store,
		
			// Refs
			characters,
			currentPage,
			storeLastPage,
			searchName,
			searchFilter,
			searchStatus,
			
			// Functions
			loadPage,
			storeSetSearch,
			storeSetCurrentPage,
		};
	}
}
</script>

<style scoped>

#characters {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
}

#characters div {
	display: flex;
	flex-direction: column;
	background-color: #EEE;
	border-radius: 8px;
	transform: scale(1);
	transition: all ease-in-out 0.2s;
}

#characters div img {
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
}

#characters div:hover {
	transform: scale(1.05);
}

#characters a {
	color: black;
	text-decoration: none;
}

#characters a:hover {
	text-decoration: underline;
}

#searchbar {
	display: flex;
	flex-wrap: wrap;
	gap: 16px;
	margin: 16px 0;
	justify-content: center;
	align-items: center;
}

#searchbar input[type="search"] {
	box-sizing: border-box;
	padding: 4px;
	font-size: 16px;
}

</style>