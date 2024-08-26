<template>
	<v-card class="my-1 py-1 position-relative" variant="elevated" rounded="xl">
		<template #prepend>
			<div class="d-flex align-center">
				<v-sheet class="text-body-1 d-flex justify-center" min-width="35px">{{ lecturer.id }}</v-sheet>
				<v-avatar size="130" rounded="xl" class="mx-2">
					<v-img :src="photo"></v-img>
				</v-avatar>
			</div>
		</template>
		<template #title>
			<v-sheet class="text-h4">{{ lecturer.last_name }}</v-sheet>
		</template>
		<template #subtitle>
			<v-sheet class="text-body-1">{{ lecturer.first_name }} {{ lecturer.middle_name }}</v-sheet>
			<div class="text-body-2">
				<v-sheet>предмет: английский</v-sheet>
				<v-sheet>отзывов: 123</v-sheet>
				<div class="d-flex">
					<v-sheet>общая оценка: +100</v-sheet>
				</div>
			</div>
		</template>
		<v-spacer />
		<v-btn
			class="text-caption position-absolute bottom-0 right-0 ma-5"
			:prepend-icon="'mdi-plus'"
			variant="elevated"
			base-color="primary"
			size="small"
			rounded="pill"
			text="отзыв"
			@click.stop="toReviewPage"
		/>
	</v-card>
</template>

<script setup lang="ts">
import { router } from '../router';

const props = defineProps({
	lecturer: { type: Object, required: true },
	photo: { type: String, required: true },
});

function toReviewPage() {
	router.push({ path: 'review', query: { lecturer_id: props.lecturer.id } });
}
</script>
