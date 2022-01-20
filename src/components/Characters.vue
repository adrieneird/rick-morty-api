<template>
	<characters-searchbar v-model="urlQuery" @update:modelValue="currentPage=1; storeSetCurrentPage(); loadPage();" />
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
import CharactersSearchbar from './CharactersSearchbar.vue'

export default {
	name: 'Characters',
	components: {
		Paginator,
		CharactersSearchbar,
	},
	setup() {
		const baseUrl = 'https://rickandmortyapi.com/api/character/';
	
		// Store
		
		const store = useStore();
		
		const storeCurrentPage = computed(() => store.getters.getCurrentPage);
		const storeLastPage = computed(() => store.getters.getLastPage);
		
		
		const storeCharacters = computed(() => store.getters.getCharactersByPage(storeCurrentPage.value));
		const storeCharactersCount = computed(() => store.getters.getCharactersByPage(storeCurrentPage.value));
	
		// Refs
	
		const characters = ref([]);
		const currentPage = ref(storeCurrentPage.value); // Keeping this as the v-model of the paginator to make it reusable
		const urlQuery = ref(''); // Search related
	
		// Functions
	
		const storeSetCurrentPage = () => {
			store.commit('setCurrentPage', currentPage.value);
		};
	
		// Relies on a simple fetch instead of axios
		const loadPage = async () => {
			if ((storeCharactersCount.value < 20 && storeCurrentPage.value !== storeLastPage.value) || (storeCurrentPage.value === storeLastPage.value)) {
				// Less than 20 characters and not on last page => must fetch
				// Last page, can't know length => must fetch
				
				const response = await fetch(`${baseUrl}?page=${storeCurrentPage.value}${urlQuery.value}`);
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
			urlQuery,
			
			// Functions
			loadPage,
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

</style>