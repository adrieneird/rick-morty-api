<template>
	<div id="searchbar">
		<input v-model="searchName" type="search" placeholder="rick, morty, jerry, etc" />
		<button @click="currentPage=1; loadPage(currentPage);">Search</button>
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
	<paginator v-model="currentPage" :last-page="lastPage" @update:modelValue="loadPage(currentPage)" />
</template>

<script>
import { ref } from 'vue';
import Paginator from './Paginator.vue'

export default {
	name: 'Characters',
	components: {
		Paginator,
	},
	setup() {
		// These informations must be stored
		const characters = ref([]);
		const currentPage = ref(1);
		const lastPage = ref(1);
		// Search related
		const searchName = ref("");
		const searchFilter = ref(false);
		const searchStatus = ref("");
	
		// Not sure if I should use axios or keep it simple with fetch
		const loadPage = async (page) => {
			let urlQuery = "";
			if (searchName.value) {
				urlQuery += `&name=${searchName.value}`;
			}
			if (searchFilter.value && searchStatus.value) {
				urlQuery += `&status=${searchStatus.value}`;
			}
		
			const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}${urlQuery}`);
			const responseJson = await response.json();
			console.log(responseJson);
			
			lastPage.value = responseJson.info.pages;
			
			//characters.value = characters.value.concat(responseJson.results);
			characters.value = responseJson.results;
		};
		loadPage(currentPage.value);
		
		return {
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