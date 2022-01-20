<template>
	<div id="character-card">
		<div id="character-top-bar">
			<div id="character-name">
				{{ character?.name }}
			</div>
			<div id="character-gender">
				{{ symbolGender }}
			</div>
		</div>
		<img :src="character?.image" />
		<div id="character-type">
			<div>
				{{ character?.species }}<span v-if="character?.type"> - {{ character?.type }}</span>
			</div>
			<div>
				{{ character?.status }}
			</div>
		</div>
		<div id="character-desc">
			<div>
				Appears in <strong>{{ character?.episode?.length }}</strong> episode{{ character?.episode?.length > 1 ? 's' : ''}}
			</div>
			
			Location
			<ul>
				<li>Origin : {{ character?.origin?.name }}</li>
				<li>Current : {{ character?.location?.name }}</li>
			</ul>
			
		</div>
	</div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
	name: 'Character',
	props: {
        id: Number,
    },
	setup(props) {
		// Router
		const router = useRouter();
	
		// Store
		const store = useStore();
	
		const character = ref(null);
		const storeCharacter = computed(() => store.getters.getCharacterById(props.id));
	
		const getCharacter = async () => {
			const response = await fetch(`https://rickandmortyapi.com/api/character/${props.id}`);
			
			// In case of error
			if (!response.ok) {
				router.push({ name: 'Characters' });
			}
			
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

<style scoped>
	#character-card {
		width: 300px;
		margin: auto;
		border: 8px solid #CCC;
		border-radius: 8px;
		background-color: #EEE;
		text-align: left;
	}
	
	#character-top-bar, #character-type {
		display: flex;
		justify-content: space-between;
		margin: 4px;
		padding: 4px;
		border: 2px solid #CCC;
		border-radius: 4px;
		background-color: #FEFEFE;
	}
	
	#character-desc {
		font-style: italic;
		padding: 10px;
	}
	
	#character-desc > * {
		margin: 8px 0;
	}
	
	ul, li {
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
