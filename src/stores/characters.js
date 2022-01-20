const charactersStore = {
    state: () => ({
        characters: [],
    }),
    mutations: {
        addCharacters(state, payload) {
			for (const character of payload.characters) {
				if (!state.characters.find(stateCharacter => stateCharacter.id === character.id)) {
					// Add page property to character object
					state.characters.push({...character, page: payload.page });
				}
			}
        },
		addCharacter(state, payload) {
			if (!state.characters.find(stateCharacter => stateCharacter.id === payload.character.id)) {
				// Add page property to character object
				state.characters.push(payload.character);
			}
        },
		clearCharacters(state) {
			state.characters = [];
		},
    },
    getters: {
        getCharacterById: (state) => (id) => {
            return state.characters.find(character => character.id === id);
        },
		getCharactersByPage: (state) => (page) => {
			// Simple version since we clear the store after each search
			return state.characters.filter(character => character.page === page);
		},
		getCountCharactersPerPage: (state) => (page) => {
			// Simple version since we clear the store after each search
			return state.characters.filter(character => character.page === page).length;
		},
    },
};

export default charactersStore;