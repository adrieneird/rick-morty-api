<template>
	<div id="paginator-wrapper">
		<div v-if="currentPage !== 1" @click="changePage(1)">
			First
		</div>
		<div v-if="currentPage > 3" class="disabled">...</div>
		<div v-for="displayPage in displayPages" :key="displayPage" @click="changePage(displayPage)" :class="displayPage === currentPage ? 'bold' : ''">
			{{ displayPage }}
		</div>
		<div v-if="currentPage < (lastPage-2)" class="disabled">...</div>
		<div v-if="currentPage !== lastPage" @click="changePage(lastPage)">
			Last
		</div>
	</div>
</template>

<script>
import { ref, watch, computed } from 'vue';

export default {
	name: 'Paginator',
	props: {
        modelValue: {
            type: Number,
            default: 1,
        },
		lastPage: Number,
    },
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const currentPage = ref(props.modelValue);
		
		watch(
            () => props.modelValue,
            (value) => {
                currentPage.value = value;
            },
        );
		
		function changePage(page = 1) {
            currentPage.value = page;
            emit('update:modelValue', currentPage.value);
        }
		
		const displayPages = computed(() => {
			const pages = [];
			let previousPagesStart = currentPage.value - 2;
			let nextPagesStop = currentPage.value + 2;
			
			if (previousPagesStart < 1) {
				previousPagesStart = 1;
			}
			if (nextPagesStop > props.lastPage) {
				nextPagesStop = props.lastPage;
			}
			
			for (let i = previousPagesStart; i <= nextPagesStop; i++) {
				pages.push(i);
			}

			return pages;
		});
		
		return {
			// Refs
			currentPage,
			
			// Computed
			displayPages,
			
			// Functions
			changePage,
		};
	}
}
</script>

<style scoped>

#paginator-wrapper {
	display: flex;
	justify-content: center;
	gap: 8px;
	margin: 8px 0;
}

#paginator-wrapper > div {
	background-color: #FEFEFE;
	border: 1px solid #DDD;
	border-radius: 4px;
	padding: 0.5em;
	font-size: 16px;
}

#paginator-wrapper > div:not(.disabled):hover {
	background-color: #EEE;
	border: 1px solid #CCC;
	cursor: pointer;
}

.bold {
	font-weight: bold;
}
</style>