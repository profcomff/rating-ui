<script async setup lang="ts">
import { router } from '@/router';
import { ref, Ref } from 'vue';
import apiClient from '@/api';
import { useProfileStore } from '@/store';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import TheSearchBar from '@/components/TheSearchBar.vue';
import TheLecturerSearchCard from '@/components/TheLecturerSearchCard.vue';
import { Lecturer, Order, Subject } from '@/models';
import { getPhoto } from '@/utils';

const profileStore = useProfileStore();

const orderValues: Ref<Order> = ref(['mark_general']);
let order: Ref<string> = ref('по общей оценке');
let offset = 0;
const query = ref('');
const subject: Ref<Subject> = ref('');
const page = ref(1);
const itemsPerPage = 10;
const totalPages: Ref<number | undefined> = ref(1);

const userAdmin = ref<boolean>(false);
userAdmin.value = profileStore.isAdmin();

const lecturers: Ref<Lecturer[] | undefined> = ref();
const lecturersPhotos = ref<string[]>(Array<string>(10));
await loadLecturers(query.value, offset, orderValues, subject);

function toLecturerPage(id: number) {
	router.push({ path: 'lecturer', query: { lecturer_id: id } });
}

async function loadLecturers(nameQuery: string, offset: number, orderQuery: Ref<Order>, subjectQuery: Ref<Subject>) {
	const res = await apiClient.GET('/rating/lecturer', {
		params: {
			query: {
				limit: itemsPerPage,
				name: nameQuery,
				offset,
				info: ['comments', 'mark'],
				subject: subjectQuery.value,
				order_by: orderQuery.value,
			},
		},
	});
	lecturers.value = res.data?.lecturers;
	totalPages.value = res.data?.total ? Math.ceil(res.data?.total / itemsPerPage) : 1;
	loadPhotos();
}

async function loadNextLecturers() {
	offset += itemsPerPage;
	await loadLecturers(query.value, offset, orderValues, subject);
}

async function loadPrevLecturers() {
	offset -= itemsPerPage;
	await loadLecturers(query.value, offset, orderValues, subject);
}

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item => getPhoto(item.avatar_link)) ?? [Placeholder];
}

async function findLecturer() {
	console.log('Find Lecturers');
	await loadLecturers(query.value, 0, orderValues, subject);
}

async function orderLecturers() {
	page.value = 1;
	switch (order.value) {
		case 'по общей оценке':
			orderValues.value[0] = 'mark_general';
			break;
		case 'по доброте':
			orderValues.value[0] = 'mark_kindness';
			break;
		case 'по халявности':
			orderValues.value[0] = 'mark_freebie';
			break;
		case 'по понятности':
			orderValues.value[0] = 'mark_clarity';
			break;
		case 'по фамилии':
			orderValues.value[0] = 'last_name';
			break;
	}
	await loadLecturers(query.value, 0, orderValues, subject);
}

async function filterLecturers() {
	page.value = 1;
	await loadLecturers(query.value, 0, orderValues, subject);
}
</script>

<template>
	<v-container class="ma-0 pa-0">
		<v-data-iterator :items="lecturers" :page="page" :items-per-page="itemsPerPage">
			<template #header>
				<v-card rounded="0" color="primary">
					<TheSearchBar
						v-model:search-query="query"
						v-model:subject="subject"
						v-model:order="order"
						:is-admin="userAdmin"
						@update:subject="filterLecturers"
						@update:order="orderLecturers"
						@update:search-query="findLecturer"
					/>
				</v-card>
			</template>

			<template #default="{ items }">
				<TheLecturerSearchCard
					v-for="(item, idx) in items"
					:key="idx"
					:lecturer="item.raw"
					:photo="lecturersPhotos[idx]"
					class="py-0"
					variant="elevated"
					@click="toLecturerPage(item.raw.id)"
				/>
			</template>

			<template #footer>
				<div v-if="lecturers">
					<v-pagination
						v-model="page"
						active-color="primary"
						variant="elevated"
						:length="totalPages"
						:total-visible="2"
						:show-first-last-page="false"
						@next="loadNextLecturers"
						@prev="loadPrevLecturers"
					/>
				</div>
			</template>
		</v-data-iterator>
	</v-container>
</template>
