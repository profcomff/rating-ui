<script setup lang="ts">
import { useProfileStore } from '../store';
import { createClient, setupAuth } from '@profcomff/api-uilib';
import { router } from '../router';

const profileStore = useProfileStore();

const apiClient = createClient('https://api.profcomff.com');
setupAuth(profileStore.token);

const lecturers = await apiClient.GET('/timetable/lecturer/');
const lecturersPhotos = lecturers.data?.items.map(
	(item: (typeof lecturers.data.items)[0]) =>
		`${import.meta.env.VITE_AUTH_API_BASE_URL}${item['avatar_link']}` ?? '../assets/example.jpg',
);

function toLecturerPage(id: number) {
	router.push({ path: 'teacher-page', query: { lecturer_id: id } });
}

function loadMoreLectors() {
	console.log('Загрузить еще лекторов');
}
</script>

<template>
	<v-container v-if="lecturers">
		<v-card max-width="750px">
			<v-text-field
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
			/>
			<div class="d-flex align-center mb-2">
				<v-sheet prepend-icon="mdn-magnify" class="mx-2 px-2 text-body-2">фильтры</v-sheet>
				<v-divider vertical />
				<v-slide-group>
					<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по рейтингу" />
					<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по доброте" />
					<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по доброте" />
					<v-btn class="ma-1 text-body-2" rounded variant="tonal" density="compact" text="по понятности" />
				</v-slide-group>
			</div>
		</v-card>
		<v-card
			v-for="(lecturer, idx) in lecturers.data?.items"
			:key="idx"
			class="my-2 py-2"
			variant="elevated"
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
