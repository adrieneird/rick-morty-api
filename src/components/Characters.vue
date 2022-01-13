<template>
	<div id="searchbar">
		<input v-model="searchName" type="search" placeholder="rick, morty, jerry, etc" />
		<button @click="currentPage=1; storeSetCurrentPage(); storeSetSearch(); loadPage();">Search</button>
		<input v-model="searchFilter" type="checkbox" id="search-filter" /> <label for="search-filter">Filter</label>
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
	<paginator v-model="currentPage" :last-page="lastPage" @update:modelValue="storeSetCurrentPage(); loadPage();" />
</template>

<script>
import { ref, computed } from 'vue';
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
		const storeSearchName = computed(() => store.getters.getSearchName);
		const storeSearchFilter = computed(() => store.getters.getSearchFilter);
		const storeSearchStatus = computed(() => store.getters.getSearchStatus);
	
		// These informations must be stored
		const characters = ref([]);
		const currentPage = ref(storeCurrentPage.value); // Keeping this as the v-model of the paginator to make it reusable
		const lastPage = ref(1);
		// Search related
		const searchName = ref(storeSearchName.value);
		const searchFilter = ref(storeSearchFilter.value);
		const searchStatus = ref(storeSearchStatus.value);
	
		const storeSetCurrentPage = () => {
			store.commit('setCurrentPage', currentPage.value);
		};
	
		const storeSetSearch = () => {
			store.commit('setSearchName', searchName.value);
			store.commit('setSearchFilter', searchFilter.value);
			store.commit('setSearchStatus', searchStatus.value);
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
		
			const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${storeCurrentPage.value}${urlQuery}`);
			const responseJson = await response.json();
			console.log(responseJson);
			
			// In case of change in the query, the last page number must be updated
			lastPage.value = responseJson.info.pages;
			
			//characters.value = characters.value.concat(responseJson.results);
			characters.value = responseJson.results;
		};
		
		// First load
		loadPage();
		
		return {
			// Store
			store,
		
			// Refs
			characters,
			currentPage,
			lastPage,
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
}
</style>