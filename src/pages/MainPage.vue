<script async setup lang="ts">
import { router } from '@/router';
import { ref, Ref } from 'vue';
import apiClient from '@/api';
import { useProfileStore } from '@/store';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import TheSearchBar from '@/components/TheSearchBar.vue';
import TheLecturerSearchCard from '@/components/TheLecturerSearchCard.vue';
import { Lecturer, Order, OrderFromText, Subject } from '@/models';
import { getPhoto } from '@/utils';

const profileStore = useProfileStore();

const orderValues: Ref<Order> = ref('mark_general');
let order: Ref<string> = ref('по общей оценке');
const ascOrderQuery = ref(true);
let offset = 0;
const query = ref('');
const subject: Ref<Subject> = ref('');
const page = ref(1);
const itemsPerPage = 10;
const totalPages: Ref<number> = ref(1);

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
				asc_order: ascOrderQuery.value,
			},
		},
	});
	lecturers.value = res.data?.lecturers;
	totalPages.value = res.data?.total ? Math.ceil(res.data?.total / itemsPerPage) : 1;
	loadPhotos();
}

async function goToNextPage() {
	offset += itemsPerPage;
	await loadLecturers(query.value, offset, orderValues, subject);
}

async function goToPreviousPage() {
	offset -= itemsPerPage;
	await loadLecturers(query.value, offset, orderValues, subject);
}

async function goToFirstPage() {
	offset = 0;
	await loadLecturers(query.value, offset, orderValues, subject);
}

async function goToLastPage() {
	offset = (totalPages.value - 1) * itemsPerPage;
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
	orderValues.value = OrderFromText[order.value as keyof typeof OrderFromText];
	await loadLecturers(query.value, 0, orderValues, subject);
}

async function filterLecturers() {
	page.value = 1;
	await loadLecturers(query.value, 0, orderValues, subject);
}

async function changeAscOrder() {
	ascOrderQuery.value = !ascOrderQuery.value;
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
						@changed-asc-desc="changeAscOrder"
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

			<template #no-data>
				<div class="ma-2">Ничего не нашли :(</div>
			</template>

			<template #footer>
				<div v-if="lecturers && totalPages > 1">
					<v-pagination
						v-model="page"
						active-color="primary"
						variant="elevated"
						:length="totalPages"
						:total-visible="1"
						:show-first-last-page="true"
						ellipsis=""
						@next="goToNextPage"
						@prev="goToPreviousPage"
						@first="goToFirstPage"
						@last="goToLastPage"
					/>
				</div>
			</template>
		</v-data-iterator>
	</v-container>
</template>
