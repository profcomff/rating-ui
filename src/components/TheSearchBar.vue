<template>
	<v-text-field
		id="start"
		prepend-inner-icon="mdi-magnify"
		class="mx-2 py-2"
		max-width="750px"
		variant="outlined"
		density="compact"
		placeholder="Найдите преподавателя"
		clearable
		hide-details="auto"
		single-line
		rounded="pill"
		@update:model-value="$emit('find-lecturer')"
	/>
</template>

<script setup lang="ts">
const emits = defineEmits({
	'find-lecturer': () => {
		return true;
	},
});
</script>
