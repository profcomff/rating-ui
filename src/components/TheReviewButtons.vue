<template>
	<div>
		<div class="d-flex justify-center mx-2">
			<v-chip-group v-model="review" selected-class="bg-secondary" mandatory @update:model-value="getReview">
				<v-chip :value="-2" size="large" rounded="circle">-2</v-chip>
				<v-chip :value="-1" size="large" rounded="circle">-1</v-chip>
				<v-chip :value="0" size="large" rounded="circle">0</v-chip>
				<v-chip :value="1" size="large" rounded="circle">1</v-chip>
				<v-chip :value="2" size="large" rounded="circle">2</v-chip>
			</v-chip-group>
		</div>
		<div class="d-flex justify-center">
			{{ property }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue';
const review = defineModel('review', { type: Number });
const props = defineProps({
	property: { type: String, required: true },
});

function getReview() {
	console.log(props.property, review.value);
}
</script>
