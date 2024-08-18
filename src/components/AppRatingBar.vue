<template>
	<v-progress-circular
		class="rating-bar text-body-2 ma-auto text-small"
		size="130"
		width="8"
		:model-value="value"
		:color="color"
		>{{ label }}</v-progress-circular
	>
</template>

<script setup lang="ts">
const props = defineProps({
	value: { type: Number, required: true },
	label: { type: String, required: true },
});

const value = props.value;

let color = '#999';
if (value < 33) {
	color = '#f00';
} else if (value < 66) {
	color = '#ff0';
} else {
	color = '#0f0';
}
</script>
