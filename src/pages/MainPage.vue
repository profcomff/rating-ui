<script async setup lang="ts">
import { router } from '../router';
import { ref, Ref } from 'vue';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';
import TheSearchBar from '../components/TheSearchBar.vue';
import TheLecturerSearchCard from '../components/TheLecturerSearchCard.vue';
import { Lecturer } from '../models/Lecturer';
// import { useGoTo } from 'vuetify';

type OrderBy = Ref<'first_name' | 'last_name' | null | undefined>;
type Filter = Ref<'id' | 'avatar_link'>;
let orderBy: OrderBy = ref(null);
let offset = 0;
const query = ref('');
const filter: Filter = ref('id');
const oldFilter: Filter = ref('id');
let page = ref(1);
let totalPages: Ref<number | undefined> = ref(1);

const lecturers: Ref<Lecturer[] | undefined> = ref();
const lecturersPhotos = ref<string[]>(Array<string>(10));
await loadLecturers(query.value, offset, orderBy);

function toLecturerPage(id: number) {
	router.push({ path: 'teacher', query: { lecturer_id: id } });
}

async function loadLecturers(query: string, offset: number, orderBy: OrderBy) {
	console.log(query, offset, orderBy.value);
	const res = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				query,
				offset,
				order_by: orderBy.value,
			},
		},
	});
	lecturers.value = res.data?.items;
	totalPages.value = res.data?.total ? Math.ceil(res.data?.total / 10) : 1;
	console.log(res);
	loadPhotos();
	filterLecturers();
}

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item =>
		item.avatar_link ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${item.avatar_link}` : Placeholder,
	) ?? [Placeholder];
}

async function findLecturer() {
	console.log('Find Lecturers');
	await loadLecturers(query.value, 0, orderBy);
}

async function orderLecturers() {
	page.value = 1;
	await loadLecturers(query.value, 0, orderBy);
}

function filterLecturers() {
	if (oldFilter.value !== filter.value) {
		oldFilter.value = filter.value;
		offset = 0;
		loadLecturers(query.value, offset, orderBy);
		page.value = 1;
	}
	if (filter.value) {
		lecturers.value = lecturers.value?.filter(item => item[filter.value] != null);
		loadPhotos();
	}
}

async function changePage() {
	offset = (page.value - 1) * 10;
	await loadLecturers(query.value, offset, orderBy);
	// // automatically scroll to top (don't know why it's not working)
	// useGoTo({
	// 	duration: 100,
	// 	easing: 'easeInOutCubic',
	// 	offset: 0,
	// 	container: '#start',
	// });
}
</script>

<template>
	<v-data-iterator :items="lecturers" :page="page" :items-per-page="10">
		<template #header>
			<v-card rounded="xl">
				<TheSearchBar v-model:searchQuery="query" @find-lecturer="findLecturer" />
				<div class="d-flex align-center mb-2">
					<v-menu location-strategy="connected">
						<template #activator="{ props }">
							<v-btn
								class="ml-2 mr-1 text-body-2"
								rounded
								:prepend-icon="'mdi-tune'"
								v-bind="props"
								density="compact"
								variant="flat"
								>фильтры</v-btn
							>
						</template>
						<v-card>
							<v-radio-group v-model="filter" @update:model-value="filterLecturers">
								<v-radio
									:color="'primary'"
									:base-color="'gray'"
									label="С аватарками"
									value="avatar_link"
									density="compact"
								/>
								<v-radio
									:color="'primary'"
									:base-color="'gray'"
									label="Сбросить"
									value=""
									density="compact"
								></v-radio>
							</v-radio-group>
						</v-card>
					</v-menu>

					<v-divider class="mx-1" vertical />

					<v-chip-group
						v-model="orderBy"
						class="ml-3"
						selected-class="bg-primary"
						@update:model-value="orderLecturers"
					>
						<v-chip density="compact" :value="'last_name'">по фамилии</v-chip>
						<v-chip density="compact" :value="'first_name'">по имени</v-chip>
					</v-chip-group>
				</div>
			</v-card>
		</template>

		<template #default>
			<TheLecturerSearchCard
				v-for="(lecturer, idx) in lecturers"
				:key="idx"
				:lecturer="lecturer"
				:photo="lecturersPhotos[idx]"
				class="my-2 py-2"
				variant="elevated"
				@click="toLecturerPage(lecturer.id)"
			/>
		</template>

		<template #footer>
			<v-pagination
				v-model="page"
				active-color="secondary"
				variant="flat"
				:length="totalPages"
				:show-first-last-page="false"
				@update:model-value="changePage"
			></v-pagination>
		</template>
	</v-data-iterator>
</template>

<style scoped></style>
