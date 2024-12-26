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
import { useProfileStore } from '@/store';

const toastStore = useToastStore();
const profileStore = useProfileStore();
const reviewSubjects = SUBJECTS.slice();
reviewSubjects.unshift('Другой предмет');

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
const lecturerSubjects = ref(lecturer?.subjects);
const photo = lecturer?.avatar_link ? `${PHOTO_BASE_PATH}${lecturer?.avatar_link}` : Placeholder;
const subjectQuery = ref('');
const warningMessage = ref('');
const isAnonymous = ref(true);

async function sendReview() {
	warningMessage.value = '';
	if (lecturer && lecturerId && subjectQuery.value !== '' && reviewSubjects.includes(subjectQuery.value)) {
		const { response } = await apiClient.POST('/rating/comment', {
			params: { query: { lecturer_id: Number(lecturerId) } },
			body: {
				subject: subjectQuery.value,
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
			} else if (profileStore.token === 'null') {
				toastStore.push({
					title: 'Вы не вошли в аккаунт',
					type: ToastType.Error,
					description: 'Отзыв могут оставить только зарегистрированные пользователи',
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
		if (subjectQuery.value == '' || subjectQuery.value == null) {
			warningMessage.value = 'Выберите предмет';
		} else if (!SUBJECTS.includes(subjectQuery.value)) {
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
			:subjects="lecturerSubjects"
		/>
		<v-combobox
			v-model="subjectQuery"
			:error-messages="warningMessage"
			hide-details="auto"
			label="Выберите предмет"
			required
			:items="reviewSubjects"
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
			<!-- <div>
				<v-switch v-model="isAnonymous" color="primary" label="Аноимный отзыв" hide-details />
			</div> -->

			<v-btn color="secondary" class="mt-3" rounded="pill" text="отправить" @click="sendReview"></v-btn>
		</div>
	</v-container>
</template>

<style scoped>
.contact a {
	display: table;
}
</style>
