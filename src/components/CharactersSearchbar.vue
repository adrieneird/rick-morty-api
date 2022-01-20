<template>
	<div id="searchbar">
		<input v-model="searchName" type="search" placeholder="rick, morty, jerry, etc" />
		<button @click="storeSetSearch();">Search</button>
		<div>
			<input v-model="searchFilter" type="checkbox" id="search-filter" /> <label for="search-filter">Filter</label>
		</div>
		<select v-model="searchStatus" @change="!searchStatus ? searchFilter=false : searchFilter=true;">
			<option value="">any</option>
			<option value="alive">alive</option>
			<option value="dead">dead</option>
			<option value="unknown">unknown</option>
		</select>
	</div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
export default {
	name: 'CharactersSearchbar',
	props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
	emits: ['update:modelValue'],
	setup(_, { emit }) {
		// Store
		const store = useStore();
		
		const storeSearchName = computed(() => store.getters.getSearchName);
		const storeSearchFilter = computed(() => store.getters.getSearchFilter);
		const storeSearchStatus = computed(() => store.getters.getSearchStatus);
	
		// Refs
		const searchName = ref(storeSearchName.value);
		const searchFilter = ref(storeSearchFilter.value);
		const searchStatus = ref(storeSearchStatus.value);
	
		// Functions
	
		const storeSetSearch = () => {
			store.commit('setSearchName', searchName.value);
			store.commit('setSearchFilter', searchFilter.value);
			store.commit('setSearchStatus', searchStatus.value);
			
			// Clear current store since it'll mess up pages
			store.commit('clearCharacters');
			
			emit('update:modelValue', urlQuery.value);
		};
		
		const urlQuery = computed(() => {
			let urlQuery = "";
			if (storeSearchName.value) {
				urlQuery += `&name=${storeSearchName.value}`;
			}
			if (storeSearchFilter.value && storeSearchStatus.value) {
				urlQuery += `&status=${storeSearchStatus.value}`;
			}
			return urlQuery;
		});
		
		return {
			// Refs
			searchName,
			searchFilter,
			searchStatus,
			
			// Functions
			storeSetSearch,
		};
	}
}
</script>

<style scoped>

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