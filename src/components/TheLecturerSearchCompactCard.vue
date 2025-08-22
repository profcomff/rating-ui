<template>
	<v-data-table
		:headers="headers"
		:items="tableItems"
		hide-default-footer
		disable-sort
		class="elevation-1 lecturer-table"
		@click:row="handleRowClick"
	>
		<template #[`item.rating`]="{ index }">
			{{ ratings[index] }}
		</template>

		<template #[`item.fullName`]="{ item }">
			<div>
				<strong>{{ item.raw.last_name }}</strong>
				{{ item.raw.first_name }} {{ item.raw.middle_name }}
			</div>
		</template>

		<template #[`item.subjects`]="{ item }">
			<template v-if="getFilteredSubjects(item.raw.subjects).length > 0">
				<v-chip
					v-for="(subject, idx) in getFilteredSubjects(item.raw.subjects).slice(0, 2)"
					:key="idx"
					size="small"
					class="mr-1 mb-1"
				>
					{{ subject }}
				</v-chip>
				<v-chip v-if="getFilteredSubjects(item.raw.subjects).length > 2" size="small" variant="outlined">
					еще {{ getFilteredSubjects(item.raw.subjects).length - 2 }}
				</v-chip>
			</template>
		</template>

		<template #[`item.comments`]="{ item }">
			{{ item.raw.comments?.length || '—' }}
		</template>

		<template #[`item.mark_general`]="{ item }">
			<v-avatar size="30" :color="getMarkColor(item.raw.mark_general)" class="white--text">
				{{ formatMark(item.raw.mark_general) }}
			</v-avatar>
		</template>
	</v-data-table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Lecturer } from '@/models';

interface TableItem {
	raw: Lecturer;
}

interface CustomDataTableHeader {
	title: string;
	key: string;
	width?: string;
	sortable?: boolean;
	align?: 'start' | 'center' | 'end';
}

const props = defineProps({
	lecturers: { type: Array as () => Lecturer[], required: true },
	ratings: { type: Array as () => number[], required: true },
});

const emit = defineEmits(['lecturerClick']);

const headers: CustomDataTableHeader[] = [
	{ title: '№', key: 'rating', width: '50px', sortable: false },
	{ title: 'ФИО', key: 'fullName', sortable: false },
	{ title: 'Предметы', key: 'subjects', sortable: false },
	{ title: 'Отзывы', key: 'comments', align: 'center', sortable: false },
	{ title: 'Оценка', key: 'mark_general', align: 'center', sortable: false },
];

// Преобразуем lecturers в формат, понятный для v-data-table
const tableItems = computed(() => {
	if (!props.lecturers) return [];
	return props.lecturers.map(lecturer => ({
		raw: lecturer,
	}));
});

function getFilteredSubjects(subjects: string[] | null | undefined): string[] {
	if (!subjects) return [];
	return subjects.filter((subject): subject is string => subject !== null);
}

function handleRowClick(event: Event, { item }: { item: TableItem }) {
	emit('lecturerClick', item.raw.id);
}

function formatMark(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return '—';
	return mark > 0 ? `+${mark.toFixed(1)}` : mark.toFixed(1);
}

function getMarkColor(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return 'grey';
	return mark > 0 ? 'green' : mark === 0 ? 'grey' : 'red';
}
</script>

<style scoped>
.lecturer-table {
	cursor: pointer;
}

:deep(.lecturer-table thead th) {
	font-weight: bold;
	background-color: #f5f5f5;
}

:deep(.lecturer-table tbody tr:hover) {
	background-color: rgb(0 0 0 / 4%);
}
</style>
