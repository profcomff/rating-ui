<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import apiClient from '@/api';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import TheReviewButtons from '@/components/TheReviewButtons.vue';
import LecturerHeaderCard from '@/components/LecturerHeaderCard.vue';
import { useToastStore } from '@/store/toastStore';
import { ToastType } from '@/models';
import { router } from '@/router';
import { PHOTO_BASE_PATH, SUBJECTS } from '@/constants';
import { useProfileStore, useReviewStore } from '@/store';

const toastStore = useToastStore();
const profileStore = useProfileStore();
const reviewStore = useReviewStore();
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
const subjectWarningMessage = ref('');
const textWarningMessage = ref('');
const isAnonymous = ref(true);
const isSubmitted = ref(false);

onMounted(() => {
	if (!lecturerId) return;

	const draft = reviewStore.getById(lecturerId);
	if (draft) {
		subjectQuery.value = draft.subject;
		reviewText.value = draft.text;
		kindReview.value = draft.mark_kindness;
		freebieReview.value = draft.mark_freebie;
		clearReview.value = draft.mark_clarity;
		isAnonymous.value = draft.is_anonymous;
	}
});

onUnmounted(() => {
	if (lecturerId && !isSubmitted.value) {
		reviewStore.save(lecturerId, {
			text: reviewText.value,
			subject: subjectQuery.value,
			mark_clarity: clearReview.value,
			mark_freebie: freebieReview.value,
			mark_kindness: kindReview.value,
			is_anonymous: isAnonymous.value,
		});
	}
});

async function checkUnallowedSymbols(text: string) {
	const unallowedSymbols = /[^a-zA-Zа-яА-Я!?&"'.,-^(){}[\]/ \n]+/g;
	const foundSymbols = text.match(unallowedSymbols);
	if (!foundSymbols) {
		return false;
	} else {
		return foundSymbols;
	}
}

async function sendReview() {
	subjectWarningMessage.value = '';
	textWarningMessage.value = '';
	const unallowedSymbols = await checkUnallowedSymbols(reviewText.value);
	if (unallowedSymbols !== false) {
		console.log(unallowedSymbols);
		textWarningMessage.value =
			'Недопустимые символы: ' + unallowedSymbols.reduce((x, acc) => acc + (acc.includes(x) ? '' : x));
		console.log(textWarningMessage.value);
		return;
	}
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
			isSubmitted.value = true;
			reviewStore.removeById(lecturerId);

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
			} else if (!profileStore.token) {
				toastStore.push({
					title: 'Войдите в профиль, чтобы оставить отзыв',
					type: ToastType.Error,
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
			subjectWarningMessage.value = 'Выберите предмет';
		} else if (!SUBJECTS.includes(subjectQuery.value)) {
			subjectWarningMessage.value = 'Введите корректный предмет';
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
			:error-messages="subjectWarningMessage"
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
				:error-messages="textWarningMessage"
				density="compact"
				label="Ваше мнение о преподавателе (необязательно)"
				hide-details="auto"
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
