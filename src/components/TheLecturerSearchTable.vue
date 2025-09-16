<template>
	<v-data-table
		:headers="headers"
		:items="tableItems"
		hide-default-footer
		disable-sort
		class="lecturer-table"
		@click:row="handleRowClick"
	>
		<template #[`item.rating`]="{ index }">
			{{ ratings[index] }}
		</template>

		<template
			#[`item.fullName`]="{
				item: {
					raw: { last_name, first_name, middle_name },
				},
			}"
		>
			<strong>{{ last_name }}</strong> {{ first_name }} {{ middle_name }}
		</template>

		<template #[`item.subjects`]="{ item }">
			<v-chip-group v-if="getFilteredSubjects(item.raw.subjects).length > 0" class="my-1">
				<v-chip
					v-for="(subject, idx) in getFilteredSubjects(item.raw.subjects).slice(0, 2)"
					:key="idx"
					size="small"
					readonly
					:ripple="false"
					class="mr-1"
				>
					{{ subject }}
				</v-chip>
				<v-chip v-if="isSubjectOverflow(item.raw.subjects)" size="small" readonly :ripple="false">
					еще {{ remainingSubjectsCount(item.raw.subjects) }}
				</v-chip>
			</v-chip-group>
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
import { formatMark, getMarkColor } from '@/utils/marks'; // Импорт из нового файла

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
	{ title: '#', key: 'rating', width: '50px', sortable: false },
	{ title: 'ФИО', key: 'fullName', sortable: false },
	{ title: 'Предметы', key: 'subjects', sortable: false },
	{ title: 'Отзывы', key: 'comments', align: 'center', sortable: false },
	{ title: 'Оценка', key: 'mark_general', align: 'center', sortable: false },
];

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

// Условие для отображения плашки "еще N"
function isSubjectOverflow(subjects: string[] | null | undefined): boolean {
	return getFilteredSubjects(subjects).length > 2;
}

// Расчет количества оставшихся предметов
function remainingSubjectsCount(subjects: string[] | null | undefined): number {
	return getFilteredSubjects(subjects).length - 2;
}

function handleRowClick(event: Event, { item }: { item: TableItem }) {
	emit('lecturerClick', item.raw.id);
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
