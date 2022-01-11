<template>
	<img :src="character?.image" />
	{{ character?.name }} - {{ character?.status }} {{ character?.species }} {{ character?.type }} {{ symbolGender }}
	Appears in {{ character?.episode.length }} episode{{ character?.episode.length > 1 ? 's' : ''}}
	{{ character?.origin?.name }} - {{ character?.location?.name }}
</template>

<script>
import { ref, computed } from 'vue';

export default {
	name: 'Character',
	props: {
        id: Number,
    },
	setup(props) {
		const character = ref(null);
	
		const getCharacter = async (id) => {
			const response = await fetch('https://rickandmortyapi.com/api/character/'+props.id);
			const responseJson = await response.json();
			console.log(responseJson);
			
			character.value = responseJson;
		}
		getCharacter(props.id);
		
		const symbolGender = computed(() => {
			if (character.value?.gender === "Male") {
				return '\u2642';
			}
			if (character.value?.gender === "Female") {
				return '\u2640';
			}
			if (character.value?.gender === "Genderless") {
				return '\u26b2';
			}
			return '?';
		});
		
		return {
			// Refs
			character,
			
			// Computed
			symbolGender,
		};
	}
}
</script>
