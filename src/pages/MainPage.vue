<script async setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { router } from '@/router';
import { useProfileStore } from '@/store';
import { useSearchStore } from '@/store/searchStore';
import { useLecturerStore } from '@/store/lecturerStore';
import { useMainPageStateStore } from '@/store/mainPageStateStore'; // Обновленный импорт
import { Order, OrderFromText, Subject } from '@/models';

import TheSearchBar from '@/components/TheSearchBar.vue';
import TheLecturerSearchCard from '@/components/TheLecturerSearchCard.vue';
import TheLecturerSearchTable from '@/components/TheLecturerSearchTable.vue';

const profileStore = useProfileStore();
const searchStore = useSearchStore();
const lecturerStore = useLecturerStore();
const mainPageStateStore = useMainPageStateStore(); // Обновленная инициализация

const { lecturers, lecturersPhotos, totalPages } = storeToRefs(lecturerStore);
const { isCompactView } = storeToRefs(mainPageStateStore); // Получение состояния из нового стора

const userAdmin = computed(() => profileStore.isAdmin());
const itemsPerPage = 10;

// Параметры поиска
const name = ref(searchStore.name);
const subject = ref<Subject>(searchStore.subject);
const order = ref(searchStore.order || 'по релевантности');
const ascending = ref(searchStore.ascending);
const page = ref(searchStore.page);

// Вычисляем порядковые номера для компактного режима
const lecturerRatings = computed(() => {
	if (!lecturers.value) return [];
	return lecturers.value.map((_, idx) => (page.value - 1) * itemsPerPage + idx + 1);
});

async function updateLecturersList() {
	await lecturerStore.fetchLecturers({
		page: page.value,
		itemsPerPage,
		name: name.value,
		subject: subject.value,
		orderBy: OrderFromText[order.value as keyof typeof OrderFromText] as Order,
		ascending: ascending.value,
	});
}

// Загрузка при первой загрузке
await updateLecturersList();

// Обработчики изменений
async function onSearchParamChange() {
	page.value = 1;
	await updateLecturersList();
}

watch(page, updateLecturersList);

function toLecturerPage(id: number) {
	searchStore.setParams(name.value, subject.value, order.value, ascending.value, page.value);
	router.push({ path: 'lecturer', query: { lecturer_id: id } });
}

function toggleViewMode() {
	mainPageStateStore.toggleCompactView(); // Используем метод из нового стора
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
			@update:subject="onSearchParamChange"
			@update:order="onSearchParamChange"
			@update:search-query="onSearchParamChange"
			@changed-asc-desc="
				() => {
					ascending = !ascending;
					onSearchParamChange();
				}
			"
		/>

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

		<div v-else>
			<TheLecturerSearchTable
				v-if="lecturers && lecturers.length > 0"
				:lecturers="lecturers"
				:ratings="lecturerRatings"
				@lecturer-click="toLecturerPage"
			/>
			<div v-else class="ma-2">Ничего не нашли :(</div>
		</div>

		<div v-if="lecturers && totalPages > 1" class="d-flex align-center justify-center mt-4">
			<v-btn icon class="mr-2" :title="isCompactView ? 'Обычный вид' : 'Компактный вид'" @click="toggleViewMode">
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
			/>
		</div>
	</v-container>
</template>
