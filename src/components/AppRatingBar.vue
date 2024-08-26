<template>
	<v-progress-circular
		class="rating-bar text-body-2 ma-auto text-small"
		:size="smAndDown ? 110 : 130"
		width="8"
		:model-value="value"
		:color="color"
		><div class="text-black">{{ label }}</div></v-progress-circular
	>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { smAndDown } = useDisplay();

const props = defineProps({
	value: { type: Number, required: true },
	label: { type: String, required: true },
});

const value = props.value;

let color = 'rgb(0, 0, 0)';
if (value < 33) {
	color = 'rgb(255, 153, 0)';
} else if (value < 66) {
	color = 'rgb(255, 204, 0)';
} else {
	color = 'rgb(0, 255, 0)';
}
</script>
