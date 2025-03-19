<template>
	<v-card class="my-1 px-0" rounded>
		<template #title>
			<div class="text-h6 font-weight-bold">{{ lecturerName }}</div>
		</template>
		<template #subtitle>
			<div class="text-h7">{{ formattedDate }} | {{ 'Анонимный отзыв' }}</div>
		</template>
		<div class="px-4 py-2">
			<p ref="textElement" class="text-subtitle-2" :class="{ 'line-clamp': !expanded }">{{ comment.raw.text }}</p>
		</div>
		<v-btn v-if="hasOverflow" variant="text" class="text-caption" @click="expanded = !expanded">
			{{ expanded ? 'Свернуть' : 'Развернуть' }}
		</v-btn>
		<template #actions>
			<v-btn class="font-weight-bold" color="primary" variant="text" @click="approveComment(comment.raw.uuid)">
				Одобрить
			</v-btn>
			<v-btn class="font-weight-bold" color="#B3261E" variant="text" @click="dismissComment(comment.raw.uuid)">
				Отклонить
			</v-btn>
		</template>
	</v-card>
</template>

<style scoped>
.line-clamp {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	white-space: pre-line;
}
</style>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import apiClient from '@/api';
import { ToastType } from '@/models';
import { useToastStore } from '@/store/toastStore';

const props = defineProps({
	comment: { type: Object, required: true },
});

const emit = defineEmits(['decided']);

const toastStore = useToastStore();
const lecturerName = ref('');
const formattedDate = ref('');
const expanded = ref(false);
const textElement = ref<HTMLElement | null>(null);
const hasOverflow = ref(false);

onMounted(async () => {
	const lecturer = await getLecturerName(props.comment.raw.lecturer_id);
	lecturerName.value = lecturer
		? [lecturer.last_name, lecturer.first_name, lecturer.middle_name].join(' ')
		: 'Неизвестный лектор';
	formattedDate.value = Intl.DateTimeFormat().format(Date.parse(props.comment.raw.create_ts));

	await nextTick();
	checkOverflow();
});

function checkOverflow() {
	if (textElement.value) {
		const el = textElement.value;
		hasOverflow.value = el.scrollHeight > el.clientHeight;
	}
}

async function getLecturerName(lecturerId: string) {
	const { data } = await apiClient.GET('/rating/lecturer/{id}', {
		params: { path: { id: Number(lecturerId) } },
	});
	return data;
}
</script>
