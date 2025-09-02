import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useMainPageStateStore = defineStore('mainPageState', () => {
	const isCompactView = ref(false);

	function setCompactView(value: boolean) {
		isCompactView.value = value;
	}

	function toggleCompactView() {
		isCompactView.value = !isCompactView.value;
	}

	return {
		isCompactView,
		setCompactView,
		toggleCompactView,
	};
});
