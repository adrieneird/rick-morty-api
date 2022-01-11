<template>
	<input type="search" placeholder="rick, morty, jerry, etc" />
	<button>Search</button>
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
		
		// This information is only necessary once
		const lastPage = ref(1);
	
		// Not sure if I should use axios or keep it simple with fetch
		const loadPage = async (page) => {
			const response = await fetch('https://rickandmortyapi.com/api/character/?page='+page);
			const responseJson = await response.json();
			console.log(responseJson);
			
			lastPage.value = responseJson.info.pages;
			
			//characters.value = characters.value.concat(responseJson.results);
			characters.value = responseJson.results;
		}
		loadPage(currentPage.value);
		
		return {
			// Refs
			characters,
			currentPage,
			lastPage,
			
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