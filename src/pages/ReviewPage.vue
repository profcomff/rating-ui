<template>
	<v-card class="container" width="100%" variant="text">
		<template #prepend>
			<v-avatar size="120">
				<v-img :src="Placeholder"></v-img>
			</v-avatar>
		</template>
		<template #title>
			<div class="text-h4">{{ lastName }}</div>
		</template>
		<template #subtitle>
			<div class="text-body-1">{{ firstName }} {{ middleName }}</div>
			<div class="contact text-body-2">
				<a href="mailto:ivanovii@example.com">a@example.com</a>
				<a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>
			</div>
		</template>
	</v-card>

	<the-review-buttons v-model:model="generalReview" property="Общая оценка"></the-review-buttons>
	<the-review-buttons v-model:model="kindReview" property="Доброта"></the-review-buttons>
	<the-review-buttons v-model:model="easyReview" property="Халявность"></the-review-buttons>
	<the-review-buttons v-model:model="understandableReview" property="Понятность"></the-review-buttons>

	<div class="mx-2">
		<div class="text-body-1 font-weight-bold">Ваше мнение о преподавателе</div>
		<v-text-field single-line density="compact" hide-details></v-text-field>
		<div class="d-flex align-center">
			<div class="text-body-2">Оставить отзыв анонимно</div>
			<v-switch class="mx-2" color="primary" hide-details></v-switch>
		</div>
		<div class="d-flex align-center mb-2">
			<v-icon :icon="'mdi-information-outline'"></v-icon>
			<div class="ml-2 text-caption">Перед публикацией ознакомьтесь с правилами</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';
import TheReviewButtons from '../components/TheReviewButtons.vue';

const generalReview = 0;
const kindReview = 0;
const easyReview = 0;
const understandableReview = 0;

const url = new URL(document.location.toString());
async function loadLecturer() {
	const res = await apiClient.GET(`/timetable/lecturer/{id}`, {
		params: {
			path: {
				id: Number(lecturerId),
			},
		},
	});
	return res.data;
}

const lecturerId = url.searchParams.get('lecturer_id');

const lecturer = await loadLecturer();
const firstName = ref(lecturer?.first_name);
const lastName = ref(lecturer?.last_name);
const middleName = ref(lecturer?.middle_name);
</script>

<style scoped>
.contact a {
	display: table;
}
</style>
