<template>
	<img :src="character?.image" />
	{{ character?.name }} - {{ character?.status }} {{ character?.species }} {{ character?.type }} {{ symbolGender }}
	Appears in {{ character?.episode?.length }} episode{{ character?.episode?.length > 1 ? 's' : ''}}
	{{ character?.origin?.name }} - {{ character?.location?.name }}
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'

export default {
	name: 'Character',
	props: {
        id: Number,
    },
	setup(props) {
		// Store
		const store = useStore();
	
		const character = ref(null);
		const storeCharacter = computed(() => store.getters.getCharacterById(props.id));
	
		const getCharacter = async () => {
			const response = await fetch(`https://rickandmortyapi.com/api/character/${props.id}`);
			const responseJson = await response.json();
			
			// Add character to store
			store.commit('addCharacter', { character: responseJson });
			
			character.value = responseJson;
		}
		
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
		
		onMounted(() => {
			// Can't find character in store, get it from API then store it
			if (!storeCharacter.value) {
				getCharacter();
			} else {
				character.value = storeCharacter.value;
			}
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
