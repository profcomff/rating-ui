<template>
	<v-text-field
		id="start"
		v-model="searchQuery"
		prepend-inner-icon="mdi-magnify"
		class="mx-2 py-2"
		variant="outlined"
		density="compact"
		placeholder="Найдите преподавателя"
		clearable
		hide-details="auto"
		single-line
		rounded="pill"
		:bg-color="'grey'"
		@update:model-value="emits('find-lecturer')"
	/>
</template>

<script setup lang="ts">
const searchQuery = defineModel('searchQuery', { type: String });

const emits = defineEmits({
	'find-lecturer': () => {
		return true;
	},
});
</script>
