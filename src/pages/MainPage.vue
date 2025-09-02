<script async setup lang="ts">
import { router } from '@/router';
import { ref, Ref, computed } from 'vue';
import apiClient from '@/api';
import { useProfileStore } from '@/store';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import TheSearchBar from '@/components/TheSearchBar.vue';
import TheLecturerSearchCard from '@/components/TheLecturerSearchCard.vue';
import TheLecturerSearchCompactCard from '@/components/TheLecturerSearchTable.vue';
import { Lecturer, Order, OrderFromText, Subject } from '@/models';
import { getPhoto } from '@/utils';
import { useSearchStore } from '@/store/searchStore';

const profileStore = useProfileStore();
const searchStore = useSearchStore();
const userAdmin = ref<boolean>(false);
userAdmin.value = profileStore.isAdmin();
const itemsPerPage = 10;

const isCompactView = ref(false);

const totalPages: Ref<number> = ref(1);

const name = ref(searchStore.name);
const subject: Ref<Subject> = ref(searchStore.subject);
const order = ref(searchStore.order || 'по релевантности');
const orderValues = ref(OrderFromText[order.value as keyof typeof OrderFromText] as Order);
const ascending = ref(searchStore.ascending);
const page = ref(searchStore.page);

const lecturers: Ref<Lecturer[] | undefined> = ref();
const lecturersPhotos = ref<string[]>(Array<string>(itemsPerPage));

// Вычисляем порядковые номера для компактного режима
const lecturerRatings = computed(() => {
	if (!lecturers.value) return [];
	return lecturers.value.map((_, idx) => (page.value - 1) * itemsPerPage + idx + 1);
});

await loadLecturers();

function toLecturerPage(id: number) {
	searchStore.setParams(name.value, subject.value, order.value, ascending.value, page.value);
	router.push({ path: 'lecturer', query: { lecturer_id: id } });
}

async function loadLecturers() {
	const offset = (page.value - 1) * itemsPerPage;
	const res = await apiClient.GET('/rating/lecturer', {
		params: {
			query: {
				limit: itemsPerPage,
				name: name.value,
				offset,
				info: ['comments', 'mark'],
				subject: subject.value,
				order_by: orderValues.value,
				asc_order: ascending.value,
			},
		},
	});
	lecturers.value = res.data?.lecturers;
	totalPages.value = res.data?.total ? Math.ceil(res.data?.total / itemsPerPage) : 1;
	loadPhotos();
}

function loadPhotos() {
	lecturersPhotos.value = lecturers.value?.map(item => getPhoto(item.avatar_link)) ?? [Placeholder];
}

async function findLecturer() {
	page.value = 1;
	await loadLecturers();
}

async function orderLecturers() {
	page.value = 1;
	orderValues.value = OrderFromText[order.value as keyof typeof OrderFromText] as Order;
	await loadLecturers();
}

async function filterLecturers() {
	page.value = 1;
	await loadLecturers();
}

async function changeAscOrder() {
	page.value = 1;
	ascending.value = !ascending.value;
	await loadLecturers();
}
</script>

<template>
	<v-container class="ma-0 py-2">
		<TheSearchBar
			v-model:search-query="name"
			v-model:subject="subject"
			v-model:order="order"
			:is-admin="userAdmin"
			:ascending="ascending"
			:page="page"
			@update:subject="filterLecturers"
			@update:order="orderLecturers"
			@update:search-query="findLecturer"
			@changed-asc-desc="changeAscOrder"
		/>

		<!-- Обычный режим с карточками -->
		<div v-if="!isCompactView">
			<v-data-iterator :items="lecturers" :items-per-page="itemsPerPage">
				<template #default="{ items }">
					<TheLecturerSearchCard
						v-for="(item, idx) in items"
						:key="idx"
						:lecturer="item.raw"
						:photo="lecturersPhotos[idx]"
						:rating="(page - 1) * itemsPerPage + idx + 1"
						class="py-0"
						variant="elevated"
						@click="toLecturerPage(item.raw.id)"
					/>
				</template>

				<template #no-data>
					<div class="ma-2">Ничего не нашли :(</div>
				</template>
			</v-data-iterator>
		</div>

		<!-- Компактный режим с таблицей -->
		<div v-else>
			<TheLecturerSearchCompactCard
				v-if="lecturers && lecturers.length > 0"
				:lecturers="lecturers"
				:ratings="lecturerRatings"
				@lecturer-click="toLecturerPage"
			/>
			<div v-else class="ma-2">Ничего не нашли :(</div>
		</div>

		<!-- Пагинация и переключатель режима -->
		<div v-if="lecturers && totalPages > 1" class="d-flex align-center justify-center mt-4">
			<v-btn
				icon
				@click="isCompactView = !isCompactView"
				class="mr-2"
				:title="isCompactView ? 'Обычный вид' : 'Компактный вид'"
			>
				<v-icon>{{ isCompactView ? 'mdi-view-agenda' : 'mdi-table' }}</v-icon>
			</v-btn>

			<v-pagination
				v-model="page"
				active-color="primary"
				variant="elevated"
				:length="totalPages"
				:total-visible="1"
				:show-first-last-page="true"
				ellipsis=""
				@update:model-value="loadLecturers"
			/>
		</div>
	</v-container>
</template>
