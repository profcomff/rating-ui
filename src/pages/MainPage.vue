<script setup lang="ts">
import { router } from '../router';
import { ref, Ref } from 'vue';
import apiClient from '../api';
// import { loadLecturers, loadPhotos, findLecturers, OrderBy } from '../api/LecturersAsyncApi';
import Placeholder from '../assets/profile_image_placeholder.webp';
import TheSearchBar from '../components/TheSearchBar.vue';
import AppOrderByButton from '../components/AppOrderByButton.vue';
import TheLecturerSearchCard from '../components/TheLecturerSearchCard.vue';
// import { useGoTo } from 'vuetify';

const lecturersQuery = await apiClient.GET('/timetable/lecturer/');
const lecturers = ref(lecturersQuery.data?.items);
const lecturersPhotos = ref<string[]>(Array<string>(10));
loadPhotos();

type OrderBy = Ref<'first_name' | 'last_name' | null | undefined>;
let order_by: OrderBy = ref(null);

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
	loadPhotos();
}

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item =>
		item.avatar_link ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${item.avatar_link}` : Placeholder,
	) ?? [Placeholder];
}

function toLecturerPage(id: number) {
	router.push({ path: 'teacher-page', query: { lecturer_id: id } });
}

const query = ref('');
async function findLecturer() {
	await loadLecturers(query.value, 0, order_by);
	loadPhotos();
}

async function orderByLastName() {
	if (order_by.value) {
		order_by.value = null;
	} else {
		order_by.value = 'last_name';
	}
	await loadLecturers('', 0, order_by);
}

async function orderByFirstName() {
	if (order_by.value) {
		order_by.value = undefined;
	} else {
		order_by.value = 'first_name';
	}
	await loadLecturers('', 0, order_by);
}

function filterWithAvatar() {
	lecturers.value = lecturers.value?.filter(item => item.avatar_link);
}

let page = ref(1);
async function changePage() {
	await loadLecturers('', (page.value - 1) * 10, order_by);
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
	<v-card>
		<TheSearchBar v-model="query" @find-lecturer="findLecturer()"></TheSearchBar>
		<div class="d-flex align-center mb-2">
			<v-menu location-strategy="connected">
				<template #activator="{ props }">
					<v-btn class="mr-3" v-bind="props">Фильтры</v-btn>
				</template>
				<v-list>
					<v-list-item>
						<v-btn @click="filterWithAvatar"> С аватарками </v-btn>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-divider vertical />

			<v-slide-group>
				<AppOrderByButton text="по фамилии" @click="orderByLastName" />
				<AppOrderByButton text="по имени" @click="orderByFirstName" />
				<AppOrderByButton text="по рейтингу" />
				<AppOrderByButton text="по доброте" />
				<AppOrderByButton text="по доброте" />
				<AppOrderByButton text="по понятности" />
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
		<v-pagination v-model="page" length="10" @update:model-value="changePage"></v-pagination>
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
}
</style>
