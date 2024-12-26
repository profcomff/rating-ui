<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { ref } from 'vue';
import apiClient from '@/api';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import AppRatingBar from '@/components/AppRatingBar.vue';
import TheReviewCard from '@/components/TheReviewCard.vue';
import LecturerHeaderCard from '@/components/LecturerHeaderCard.vue';
import { adaptNumeral, getPhoto } from '@/utils';

const { mobile } = useDisplay();

const router = useRouter();

const page = ref(1);
const itemsPerPage = 3;

const url = new URL(document.location.toString());
const lecturerId = url.searchParams.get('lecturer_id');

const lecturer = await loadLecturer();
const firstName = ref(lecturer?.first_name);
const lastName = ref(lecturer?.last_name);
const middleName = ref(lecturer?.middle_name);
const avatarLink = ref(lecturer?.avatar_link);
const lecturerSubjects = ref(lecturer?.subjects);

async function loadLecturer() {
	const res = await apiClient.GET(`/rating/lecturer/{id}`, {
		params: {
			path: {
				id: Number(lecturerId),
			},
			query: {
				info: ['comments', 'mark'],
			},
		},
	});
	return res.data;
}

let howKind = lecturer?.mark_kindness ?? 0;
let howFree = lecturer?.mark_freebie ?? 0;
let howClear = lecturer?.mark_clarity ?? 0;

const lecturerPhoto = getPhoto(avatarLink.value);
</script>

<template>
	<v-container class="pa-2 justify-center">
		<v-btn class="mb-4" color="primary" text="Назад к поиску" rounded="lg" @click="router.push('/')"></v-btn>
		<LecturerHeaderCard
			:photo="lecturerPhoto"
			:first-name="firstName ?? 'Ошибка'"
			:last-name="lastName ?? 'Ошибка'"
			:middle-name="middleName ?? 'Ошибка'"
			:subjects="lecturerSubjects"
		/>
		<div class="d-table w-100 my-2">
			<AppRatingBar :value="howKind" label="доброта"></AppRatingBar>
			<AppRatingBar :value="howFree" label="халявность"></AppRatingBar>
			<AppRatingBar :value="howClear" label="понятность"></AppRatingBar>
		</div>
		<div class="mb-4">
			<v-row justify="space-between" no-gutters>
				<v-col :cols="mobile ? '4' : '2'">
					<v-card class="pr-1 mr-1" height="100px" variant="tonal" min-width="100px" rounded="xl">
						<template #prepend>
							<v-icon :icon="'mdi-tree-outline'"></v-icon>
						</template>
						<template #title>{{ lecturer?.mark_general?.toFixed(2) ?? '—' }}</template>
						<template #text
							>{{ lecturer?.comments?.length ?? 'нет' }}
							{{ adaptNumeral(lecturer?.comments?.length, 'отзыв', 'отзыва', 'отзывов') }}</template
						>
					</v-card>
				</v-col>
				<v-col :cols="mobile ? '8' : '10'">
					<v-card class="pl-1 ml-1" height="100px" color="#eee" variant="flat" rounded="xl">
						<v-card-item :class="mobile ? 'text-caption' : 'text-body-1'">
							<p>
								В рейтинге учитываются как отзывы из "старой" Дубинушки, так и новые, которые прошли
								модерацию
							</p>
						</v-card-item>
					</v-card>
				</v-col>
			</v-row>
		</div>

		<div v-if="lecturer?.comments">
			<v-data-iterator class="mr-0 pa-0" :page="page" :items="lecturer?.comments" :items-per-page="itemsPerPage">
				<template #default="{ items: reviews }">
					<template v-for="review in reviews" :key="review.uuid">
						<TheReviewCard :comment="review" :photo="Placeholder" @comment-deleted="$router.go" />
					</template>
				</template>
				<template #footer="{ pageCount }">
					<v-pagination
						v-model="page"
						active-color="primary"
						variant="elevated"
						total-visible="1"
						:length="pageCount"
						:show-first-last-page="true"
					></v-pagination>
				</template>
			</v-data-iterator>

			<v-footer class="position-fixed bottom-0 pa-0 mb-3 pr-12">
				<v-btn
					:icon="'mdi-pen'"
					color="secondary"
					class="footer-button mr-1"
					rounded="pill"
					variant="flat"
					@click="router.push({ path: 'review', query: { lecturer_id: lecturerId } })"
				/>
			</v-footer>
		</div>

		<div v-else>
			<v-btn
				no-gutters
				color="secondary"
				rounded="xl"
				class="w-100"
				@click="router.push({ path: 'review', query: { lecturer_id: lecturerId } })"
			>
				Оставить первый отзыв
			</v-btn>
		</div>
	</v-container>
</template>

<style scoped>
.contact a {
	display: table;
}

.v-footer {
	width: min(900px, 100%);
	background-color: #0000;
}

.footer-button {
	position: absolute;
	right: 10px;
	bottom: 0;
}
</style>
