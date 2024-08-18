<script async setup lang="ts">
import { router } from '../router';
import { ref, Ref } from 'vue';
import apiClient from '../api';
// import { loadLecturers, loadPhotos, findLecturers, OrderBy } from '../api/LecturersAsyncApi';
import Placeholder from '../assets/profile_image_placeholder.webp';
import TheSearchBar from '../components/TheSearchBar.vue';
import AppOrderByButton from '../components/AppOrderByButton.vue';
import TheLecturerSearchCard from '../components/TheLecturerSearchCard.vue';
import { Lecturer } from '../models/Lecturer';
// import { useGoTo } from 'vuetify';

type OrderBy = Ref<'first_name' | 'last_name' | null | undefined>;
let order_by: OrderBy = ref(null);
const offset = ref<number>(0);
const query = ref('');
const filter = ref<string>('');
const oldFilter = ref<string>('');
let page = ref(1);
let totalPages: Ref<number | undefined> = ref(1);

const lecturers: Ref<Lecturer> = ref([]);
const lecturersPhotos = ref<string[]>(Array<string>(10));
await loadLecturers(query, offset, order_by);

async function loadLecturers(query: string, offset: number, order_by: OrderBy) {
	const res = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				query,
				offset,
				order_by: order_by.value,
			},
		},
	});
	lecturers.value = res.data?.items;
	totalPages.value = Math.ceil(res.data?.total / 10);
	loadPhotos();
	filterLecturers();
}

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item =>
		item.avatar_link ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${item.avatar_link}` : Placeholder,
	) ?? [Placeholder];
}

function toLecturerPage(id: number) {
	router.push({ path: 'teacher-page', query: { lecturer_id: id } });
}

async function findLecturer() {
	console.log('Find Lecturers');
	await loadLecturers(query.value, 0, order_by);
}

async function orderByLastName() {
	console.log('Last Name Order');
	if (order_by.value) {
		order_by.value = null;
	} else {
		order_by.value = 'last_name';
	}
	page.value = 1;
	await loadLecturers(query.value, 0, order_by);
}

async function orderByFirstName() {
	console.log('First Name Order');
	if (order_by.value) {
		order_by.value = undefined;
	} else {
		order_by.value = 'first_name';
	}
	page.value = 1;
	await loadLecturers(query.value, 0, order_by);
}

function filterLecturers() {
	console.log('Filter: ', filter.value);
	if (oldFilter.value !== filter.value) {
		oldFilter.value = filter.value;
		loadLecturers(query.value, offset.value, order_by);
		page.value = 1;
	}
	if (filter.value) {
		lecturers.value = lecturers.value?.filter(item => item[filter.value] != null);
		loadPhotos();
	}
}

async function changePage() {
	offset.value = (page.value - 1) * 10;
	await loadLecturers(query.value, offset.value, order_by);
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
	<v-card rounded="xl">
		<TheSearchBar v-model:searchQuery="query" @find-lecturer="findLecturer"></TheSearchBar>
		<div class="d-flex align-center mb-2">
			<v-menu location-strategy="connected">
				<template #activator="{ props }">
					<v-btn class="ml-2 mr-1 text-body-2" rounded v-bind="props" density="compact" variant="tonal"
						>фильтры</v-btn
					>
				</template>
				<v-list>
					<v-list-item>
						<v-radio-group v-model="filter" @update:model-value="filterLecturers">
							<v-radio label="С аватарками" value="avatar_link" density="compact"></v-radio>
							<v-radio label="Сбросить" value="" density="compact"></v-radio>
						</v-radio-group>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-divider class="mx-1" vertical />

			<v-slide-group selected-class="selected-order" show-arrows>
				<AppOrderByButton text="по фамилии" :selected="order_by === 'last_name'" @click="orderByLastName" />
				<AppOrderByButton text="по имени" :selected="order_by === 'first_name'" @click="orderByFirstName" />
				<AppOrderByButton text="по рейтингу" :selected="false" />
				<AppOrderByButton text="по доброте" :selected="false" />
				<AppOrderByButton text="по доброте" :selected="false" />
				<AppOrderByButton text="по понятности" :selected="false" />
			</v-slide-group>
		</div>
	</v-card>

	<TheLecturerSearchCard
		v-for="(lecturer, idx) in lecturers"
		:key="idx"
		:lecturer="lecturer"
		:photo="lecturersPhotos[idx]"
		class="my-2 py-2"
		variant="elevated"
		@click="toLecturerPage(lecturer.id)"
	>
	</TheLecturerSearchCard>

	<v-container>
		<v-pagination v-model="page" :length="totalPages" @update:model-value="changePage"></v-pagination>
	</v-container>
</template>

<style scoped>
.selected-order {
	background-color: blue;
}
</style>
