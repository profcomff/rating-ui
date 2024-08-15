<script setup lang="ts">
import { router } from '../router';
import { ref } from 'vue';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';

const lecturersQuery = await apiClient.GET('/timetable/lecturer/');
const lecturers = ref(lecturersQuery.data?.items);
const lecturersPhotos = ref([]);
loadPhotos();

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item =>
		item.avatar_link ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${item.avatar_link}` : Placeholder,
	);
}

async function loadLecturers(order_by) {
	const query = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				order_by: order_by,
			},
		},
	});
	lecturers.value = query.data?.items;
	loadPhotos();
}

let offset = 0;
let order_by: string | undefined = undefined;

function toLecturerPage(id: number) {
	router.push({ path: 'teacher-page', query: { lecturer_id: id } });
}

async function loadMoreLectors() {
	offset += 10;
	const query = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				offset,
				order_by,
			},
		},
	});
	lecturers.value = lecturers.value?.concat(query.data?.items);
	loadPhotos();
}

const findLecturer = ref('');
async function findLecturers(order_by) {
	const query = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				query: findLecturer.value,
				order_by: order_by,
			},
		},
	});
	lecturers.value = query.data?.items;
	loadPhotos();
}

async function filterByLastName() {
	if (order_by) {
		order_by = undefined;
	} else {
		order_by = 'last_name';
	}
	await loadLecturers(order_by);
}

async function filterByFirstName() {
	if (order_by) {
		order_by = undefined;
	} else {
		order_by = 'first_name';
	}
	await loadLecturers(order_by);
}
</script>

<template>
	<v-card max-width="750px">
		<v-text-field
			v-model="findLecturer"
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
			@update:model-value="findLecturers(order_by)"
		/>
		<div class="d-flex align-center mb-2">
			<v-sheet prepend-icon="mdn-magnify" class="mx-2 px-2 text-body-2">фильтры</v-sheet>
			<v-divider vertical />
			<v-slide-group>
				<v-btn
					class="ma-1 text-body-2"
					rounded
					variant="tonal"
					density="compact"
					text="по фамилии"
					@click="filterByLastName"
				/>
				<v-btn
					class="ma-1 text-body-2"
					rounded
					variant="tonal"
					density="compact"
					text="по имени"
					@click="filterByFirstName"
				/>
				<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по рейтингу" />
				<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по доброте" />
				<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по доброте" />
				<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по понятности" />
			</v-slide-group>
		</div>
	</v-card>
	<v-card
		v-for="(lecturer, idx) in lecturers"
		:key="idx"
		class="my-2 py-2"
		variant="elevated"
		max-width="750px"
		@click="toLecturerPage(lecturer.id)"
	>
		<template #prepend>
			<v-avatar size="100" rounded="rounded" class="pr-2 mr-2">
				<v-img :src="lecturersPhotos[idx]"></v-img>
			</v-avatar>
		</template>
		<template #title>
			<v-sheet class="text-h4">{{ lecturer.last_name }}</v-sheet>
		</template>
		<template #subtitle>
			<v-sheet class="text-body-1">{{ lecturer.first_name }} {{ lecturer.middle_name }}</v-sheet>
			<div class="text-body-2">
				<v-sheet>предмет: английский</v-sheet>
				<v-sheet>отзывов: 123</v-sheet>
				<div class="d-flex">
					<v-sheet>общая оценка: +100</v-sheet>
					<v-spacer />
					<v-btn
						class="text-caption"
						variant="tonal"
						color="primary"
						size="x-small"
						justify="right"
						text="+отзыв"
					/>
				</div>
			</div>
		</template>
	</v-card>
	<v-container>
		<v-btn class="d-flex mx-auto" text="Загрузить еще" @click="loadMoreLectors" />
	</v-container>
</template>

<style>
.toolbar {
	display: table;
}

.contact a {
	display: table;
}

.main {
	align-items: center;
	max-width: 750px;
}
</style>
