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
		getCharactersByPage: (state) => (page, searchName, searchFilter, searchStatus) => {
			// Simple version since we clear the store after each search
			return state.characters.filter(character => character.page === page);
			/*
			if (!searchName && (!searchFilter || !searchStatus)) {
				return state.characters.filter(character => character.page === page);
			} else {
				if (searchName && searchFilter && searchStatus) {
					return state.characters.filter(character => character.page === page && character.status === searchStatus && character.name.includes(searchName));
				} else if (searchName) {
					return state.characters.filter(character => character.page === page && character.name.includes(searchName));
				} else if (searchFilter && searchStatus) {
					return state.characters.filter(character => character.page === page && character.status === searchStatus);
				} else {
					return null;
				}
			}
			*/
		},
		getCountCharactersPerPage: (state) => (page, searchName, searchFilter, searchStatus) => {
			// Simple version since we clear the store after each search
			return state.characters.filter(character => character.page === page).length;
			/*
			if (!searchName && (!searchFilter || !searchStatus)) {
				return state.characters.filter(character => character.page === page).length;
			} else {
				if (searchName && searchFilter && searchStatus) {
					return state.characters.filter(character => character.page === page && character.status === searchStatus && character.name.includes(searchName)).length;
				} else if (searchName) {
					return state.characters.filter(character => character.page === page && character.name.includes(searchName)).length;
				} else if (searchFilter && searchStatus) {
					return state.characters.filter(character => character.page === page && character.status === searchStatus).length;
				} else {
					return 0;
				}
			}
			*/
		},
    },
};

export default charactersStore;