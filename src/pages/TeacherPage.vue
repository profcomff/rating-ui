<script setup lang="ts">
import Markdown from '../components/MarkdownRenderer.vue';
import { useRouter } from 'vue-router';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';

const router = useRouter();

const url = new URL(document.location.toString());
const lecturerId = url.searchParams.get('lecturer_id');

console.log(lecturerId);

const lecturer = await apiClient.GET(`/timetable/lecturer/{id}`, {
	params: {
		path: {
			id: Number(lecturerId),
		},
	},
});

let howKind: number = 10;
let howEasy: number = 35;
let howUnderstandable: number = 60;

const lecturerLastName = lecturer.data?.last_name;
const lecturerFirstName = lecturer.data?.first_name;
const lecturerMiddleName = lecturer.data?.middle_name;
const lecturerPhoto = lecturer.data?.avatar_link
	? `${import.meta.env.VITE_AUTH_API_BASE_URL}${lecturer.data?.avatar_link}`
	: Placeholder;
console.log(lecturer.data?.avatar_link);
const lecturerInfo = lecturer.data?.description ?? 'Информации нет';
const screenWidth = window.innerWidth;
</script>

<template>
	<div v-if="lecturer" class="main">
		<v-btn text="Назад к поиску" @click="router.push('/')"></v-btn>
		<v-card class="container" width="100%" variant="text">
			<template #prepend>
				<v-avatar size="120">
					<v-img :src="lecturerPhoto"></v-img>
				</v-avatar>
			</template>
			<template #title>
				<v-sheet class="text-h4">{{ lecturerLastName }}</v-sheet>
			</template>
			<template #subtitle>
				<v-sheet class="text-body-1">{{ lecturerFirstName }} {{ lecturerMiddleName }}</v-sheet>
				<div class="contact text-body-2">
					<a href="mailto:ivanovii@example.com">a@example.com</a>
					<a href="tel:+7(999)999-99-99">+7(999)999-99-99</a>
				</div>
			</template>
		</v-card>
		<v-container>
			<v-progress-circular class="rating-bar text-body-2" :size="130" :width="8" :model-value="howKind">
				Доброта
			</v-progress-circular>
			<v-progress-circular class="rating-bar text-body-2" :size="130" :width="8" :model-value="howEasy">
				Халявность
			</v-progress-circular>
			<v-progress-circular class="rating-bar text-body-2" :size="130" :width="8" :model-value="howUnderstandable">
				Понятность
			</v-progress-circular>
		</v-container>
		<v-container max-width="750px">
			<v-row justify="center" no-gutters>
				<v-col cols="md-2">
					<v-card class="pr-1 mr-1" height="100px" variant="tonal" min-width="100px">
						<template #prepend>
							<v-icon icon="$vuetify"></v-icon>
						</template>
						<template #title>+100</template>
						<template #text>123 отзыва</template>
					</v-card>
				</v-col>
				<v-col cols="xs-2">
					<v-card class="pl-1 ml-1" height="100px" color="#eee" variant="flat">
						<v-card-item :class="screenWidth < 600 ? 'text-caption' : 'text-body-1'">
							<p>В рейтинге учитываются лишь отзывы, оставленные за последние 3 года</p>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</v-container>
		<v-container class="justify-start">
			<Markdown :text="lecturerInfo" />
		</v-container>
	</div>
</template>

<style>
.contact a {
	display: table;
}

.v-container {
	margin: auto;
	max-width: 750px;
	display: flex;
	justify-content: center;
}

.main {
	align-items: center;
}

.v-col {
	margin: auto;
}

.rating-bar {
	color: #999;
	margin: auto;
	font-size: small;
}
</style>
