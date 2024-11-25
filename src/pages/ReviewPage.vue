<script setup lang="ts">
import { ref, computed } from 'vue';
import apiClient from '@/api';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import TheReviewButtons from '@/components/TheReviewButtons.vue';
import LecturerHeaderCard from '@/components/LecturerHeaderCard.vue';
import { useToastStore } from '@/store/toastStore';
import { ToastType } from '@/models';
import { router } from '@/router';
import { PHOTO_BASE_PATH, SUBJECTS } from '@/constants';

const toastStore = useToastStore();

const kindReview = ref(0);
const freebieReview = ref(0);
const clearReview = ref(0);

const generalReview = computed(() => {
	return ((kindReview.value + freebieReview.value + clearReview.value) / 3).toFixed(2);
});

const reviewText = ref('');

const url = new URL(document.location.toString());
async function loadLecturer() {
	const res = await apiClient.GET(`/rating/lecturer/{id}`, {
		params: {
			path: {
				id: Number(lecturerId),
			},
		},
	});
	return res.data;
}

const lecturerId = url.searchParams.get('lecturer_id');

const lecturer = await loadLecturer();
const firstName = ref(lecturer?.first_name);
const lastName = ref(lecturer?.last_name);
const middleName = ref(lecturer?.middle_name);
const Subjects = ref(lecturer?.subjects);
const photo = lecturer?.avatar_link ? `${PHOTO_BASE_PATH}${lecturer?.avatar_link}` : Placeholder;
const subject = ref('');
const warningMessage = ref('');
const isAnonymous = ref(false);

async function sendReview() {
	warningMessage.value = '';
	if (lecturer && lecturerId && subject.value !== '' && SUBJECTS.includes(subject.value)) {
		const { response } = await apiClient.POST('/rating/comment', {
			params: { query: { lecturer_id: Number(lecturerId) } },
			body: {
				subject: subject.value,
				text: reviewText.value,
				mark_kindness: kindReview.value,
				mark_freebie: freebieReview.value,
				mark_clarity: clearReview.value,
				is_anonymous: isAnonymous.value,
			},
		});
		if (response.ok) {
			toastStore.push({
				title: 'Отзыв отправлен!',
				type: ToastType.Info,
				description: 'После модерации отзыв будет опубликован или отклонен',
			});
			router.push({
				path: '/lecturer',
				query: { lecturer_id: lecturerId },
			});
		} else {
			if (response.status == 429) {
				toastStore.push({
					title: 'Слишком частая отправка отзывов',
					type: ToastType.Warn,
					description: 'Подождите немного перед тем, как отправить следующий отзыв',
				});
			} else {
				toastStore.push({
					title: 'Что-то пошло не так...',
					type: ToastType.Error,
					description: 'Попробуйте еще раз, или обратитесь в поддержку',
				});
			}
		}
	} else {
		if (subject.value == '' || subject.value == null) {
			warningMessage.value = 'Выберите предмет';
		} else if (!SUBJECTS.includes(subject.value)) {
			warningMessage.value = 'Введите корректный предмет';
		} else {
			toastStore.push({
				title: 'Что-то пошло не так...',
				type: ToastType.Error,
				description: 'Попробуйте еще раз, или обратитесь в поддержку',
			});
		}
	}
}
</script>

<template>
	<v-container>
		<v-btn
			class="mb-4"
			color="primary"
			text="К лектору"
			@click="
				router.push({
					path: 'lecturer',
					query: { lecturer_id: lecturerId },
				})
			"
		></v-btn>
		<LecturerHeaderCard
			class="mb-2"
			:photo="photo"
			:first-name="firstName ?? 'Ошибка'"
			:last-name="lastName ?? 'Ошибка'"
			:middle-name="middleName ?? 'Ошибка'"
			:subjects-name="Subjects"
		/>
		<v-combobox
			v-model="subject"
			:error-messages="warningMessage"
			hide-details="auto"
			label="Выберите предмет"
			required
			:items="SUBJECTS"
		/>

		<the-review-buttons v-model:review="kindReview" property="Доброта"></the-review-buttons>
		<the-review-buttons v-model:review="freebieReview" property="Халявность"></the-review-buttons>
		<the-review-buttons v-model:review="clearReview" property="Понятность"></the-review-buttons>

		<div class="mx-2 mt-2">
			<v-textarea
				v-model="reviewText"
				density="compact"
				label="Ваше мнение о преподавателе (необязательно)"
				hide-details
			></v-textarea>
			<div class="d-flex align-center mt-4">
				<v-icon :icon="'mdi-star'"></v-icon>
				<div class="ml-2 text-body-1">
					Общая оценка: {{ Number(generalReview) > 0 ? '+' + generalReview : generalReview }}
				</div>
			</div>
			<div>
				<v-switch v-model="isAnonymous" color="primary" label="Аноимный отзыв" hide-details />
			</div>

			<v-btn color="secondary" class="mt-3" rounded="pill" text="отправить" @click="sendReview"></v-btn>
		</div>
	</v-container>
</template>

<style scoped>
.contact a {
	display: table;
}
</style>
