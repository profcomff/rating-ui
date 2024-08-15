<template>
	<v-card class="my-2 py-2" variant="elevated">
		<template #prepend>
			<v-avatar size="100" rounded="rounded" class="pr-2 mr-2">
				<v-img :src="photo"></v-img>
			</v-avatar>
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
					<v-spacer />
					<v-btn
						class="text-caption"
						variant="tonal"
						color="primary"
						size="x-small"
						justify="right"
						text="+отзыв"
					/>
				</div>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
defineProps({
	lecturer: { type: Object, required: true },
	photo: { type: String, required: true },
});
</script>
