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
</template>

<script>
import { ref } from 'vue';

export default {
	name: 'Characters',
	setup() {
		const characters = ref([]);
	
		const userAction = async () => {
			const response = await fetch('https://rickandmortyapi.com/api/character');
			const responseJson = await response.json();
			console.log(responseJson);
			
			characters.value = characters.value.concat(responseJson.results);
		}
		userAction();
		
		return {
			characters,
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