<template>
	<!-- TODO: fix positioning and width -->
	<!-- TODO: add tripple dot menu -->
	<v-card class="my-1 py-1 px-0 mx-3" variant="tonal" rounded="xl">
		<template #prepend>
			<div class="d-flex align-center">
				<v-avatar size="50" rounded="circle" class="mr-2">
					<v-img :src="photo" rounded="circle"></v-img>
				</v-avatar>
			</div>
		</template>
		<template #title>
			<div class="text-h6">{{ 'Иванов Иван' }}</div>
		</template>
		<template #subtitle>
			<div class="text-h7">{{ '22 августа 2024' }}</div>
		</template>
		<template #text>
			<v-row no-gutters justify="space-between">
				<v-col class="text-left">
					Доброта: <strong>{{ comment.raw.mark_kindness }}</strong>
				</v-col>
				<v-col class="text-center">
					Халявность: <strong>{{ comment.raw.mark_freebie }}</strong>
				</v-col>
				<v-col class="text-center">
					Понятность: <strong>{{ comment.raw.mark_kindness }}</strong>
				</v-col>
				<v-col class="text-right">
					<strong>{{ (mark_general > 0 ? '+' : '') + mark_general.toFixed(2) }}</strong>
				</v-col>
			</v-row>
			<p>{{ comment.raw.text }}</p>
		</template>
		<template #append>
			<v-btn color="green" text="Одобрить" variant="flat" @click="approveComment(comment.raw.uuid)"></v-btn>
			<v-btn color="red" text="Отклонить" variant="flat" @click="dismissComment(comment.raw.uuid)"></v-btn>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import apiClient from '../api';
import { Review, ToastType } from '../models';
import { DataIteratorItem } from 'vuetify/lib/components/items';
import { useToastStore } from '../store/toastStore';

const props = defineProps({
	photo: { type: String, required: true },
	comment: { type: Object as DataIteratorItem<Review>, required: true },
});

const emit = defineEmits(['decided']);

const toastStore = useToastStore();

const mark_general =
	(props.comment.raw.mark_clarity + props.comment.raw.mark_kindness + props.comment.raw.mark_freebie) / 3;

async function approveComment(id: string) {
	const { response } = await apiClient.PATCH('/rating/comment/{uuid}', {
		params: {
			path: { uuid: id },
			query: { review_status: 'approved' },
		},
	});
	if (response.ok) {
		toastStore.push({
			title: 'Отзыв одобрен',
			type: ToastType.Info,
		});
		emit('decided');
	} else {
		toastStore.push({
			title: 'Что-то не так',
			type: ToastType.Error,
			description: response.statusText,
		});
	}
}

async function dismissComment(id: string) {
	const { response } = await apiClient.PATCH('/rating/comment/{uuid}', {
		params: {
			path: { uuid: id },
			query: { review_status: 'dismissed' },
		},
	});
	if (response.ok) {
		toastStore.push({
			title: 'Отзыв отклонен',
			type: ToastType.Info,
		});
		emit('decided');
	} else {
		toastStore.push({
			title: 'Что-то не так',
			type: ToastType.Error,
			description: response.statusText,
		});
	}
}
</script>
