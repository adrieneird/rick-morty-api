<template>
	<div id="searchbar">
		<input v-model="searchName" type="search" placeholder="rick, morty, jerry, etc" />
		<button @click="currentPage=1; store.commit('setCurrentPage', currentPage); loadPage();">Search</button>
		<input v-model="searchFilter" type="checkbox" id="search-filter" /> <label for="search-filter">Filter</label>
		<select v-model="searchStatus">
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
	<paginator v-model="currentPage" :last-page="lastPage" @update:modelValue="store.commit('setCurrentPage', currentPage); loadPage();" />
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
	
		// These informations must be stored
		const characters = ref([]);
		const currentPage = ref(storeCurrentPage.value); // Keeping this as the v-model of the paginator to make it reusable
		const lastPage = ref(1);
		// Search related
		const searchName = ref("");
		const searchFilter = ref(false);
		const searchStatus = ref("");
	
		// Relies on a simple fetch instead of axios
		const loadPage = async () => {
			let urlQuery = "";
			if (searchName.value) {
				urlQuery += `&name=${searchName.value}`;
			}
			if (searchFilter.value && searchStatus.value) {
				urlQuery += `&status=${searchStatus.value}`;
			}
		
			const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${storeCurrentPage.value}${urlQuery}`);
			const responseJson = await response.json();
			console.log(responseJson);
			
			// In case of change in the query, the last page number must be updated
			lastPage.value = responseJson.info.pages;
			
			//characters.value = characters.value.concat(responseJson.results);
			characters.value = responseJson.results;
		};
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