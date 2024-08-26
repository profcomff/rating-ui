<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import Markdown from '../components/AppMarkdownRenderer.vue';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';
import AppRatingBar from '../components/AppRatingBar.vue';
import TheReviewCard from '../components/TheReviewCard.vue';

const { smAndDown } = useDisplay();

const router = useRouter();

const url = new URL(document.location.toString());
const lecturerId = url.searchParams.get('lecturer_id');

const lecturer = await loadLecturer();
const firstName = ref(lecturer?.first_name);
const lastName = ref(lecturer?.last_name);
const middleName = ref(lecturer?.middle_name);
const avatarLink = ref(lecturer?.avatar_link);
const description = ref(lecturer?.description);

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

let howKind: number = 10;
let howEasy: number = 35;
let howUnderstandable: number = 85;

const lecturerPhoto = avatarLink.value ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${avatarLink.value}` : Placeholder;
const lecturerInfo = description.value ?? 'Информации нет';
</script>

<template>
	<div class="main">
		<v-btn text="Назад к поиску" @click="router.push('/')"></v-btn>
		<v-card class="container" width="100%" variant="text">
			<template #prepend>
				<v-avatar size="120">
					<v-img :src="lecturerPhoto"></v-img>
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
		<v-container>
			<AppRatingBar :value="howKind" label="доброта"></AppRatingBar>
			<AppRatingBar :value="howEasy" label="халявность"></AppRatingBar>
			<AppRatingBar :value="howUnderstandable" label="понятность"></AppRatingBar>
		</v-container>
		<v-container>
			<v-row justify="center" no-gutters>
				<v-col cols="md-2">
					<v-card class="pr-1 mr-1" height="100px" variant="tonal" min-width="100px" rounded="xl">
						<template #prepend>
							<v-icon :icon="'mdi-tree-outline'"></v-icon>
						</template>
						<template #title>+100</template>
						<template #text>123 отзыва</template>
					</v-card>
				</v-col>
				<v-col cols="xs-2">
					<v-card class="pl-1 ml-1" height="100px" color="#eee" variant="flat" rounded="xl">
						<v-card-item :class="smAndDown ? 'text-caption' : 'text-body-1'">
							<p>В рейтинге учитываются лишь отзывы, оставленные за последние 3 года</p>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</v-container>

		<v-container class="justify-start">
			<Markdown :text="lecturerInfo" />
		</v-container>

		<TheReviewCard :photo="Placeholder" />
		<TheReviewCard class="mb-11" :photo="Placeholder" />
	</div>

	<!-- TODO: fix position and width -->
	<v-footer width="auto">
		<div class="d-flex justify-end w-100">
			<v-fab
				class="mb-3"
				text="Оставить отзыв"
				width="w-100"
				rounded="pill"
				variant="flat"
				@click="router.push({ path: 'review', query: { lecturer_id: lecturerId } })"
			/>
		</div>
	</v-footer>
</template>

<style scoped>
.contact a {
	display: table;
}

.v-container {
	margin: auto;
	display: flex;
	justify-content: center;
}

.main {
	align-items: center;
}

.v-footer {
	bottom: 0;
	position: fixed;
	width: 100%;
	background-color: #0000;
}
</style>
