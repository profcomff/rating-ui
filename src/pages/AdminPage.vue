<template>
	<v-container>
		<v-btn class="mb-4" color="primary" text="На главную" @click="router.push('/')"></v-btn>
		<p class="text-body-2 ml-4">
			Перед одобрением отзыва убедитесь, что он соответствует
			<a href="https://pages.profcomff.com/rating_review_rules">правилам</a>.
		</p>
		<v-data-iterator v-if="comments && comments?.comments.length > 0" :items="comments.comments">
			<template #default="{ items }">
				<template v-for="(item, i) in items" :key="i">
					<AdminReviewCard :comment="item" :photo="Placeholder" @decided="loadComments" />
				</template>
			</template>
		</v-data-iterator>
		<div v-else>Нет комментариев</div>
	</v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import apiClient from '../api';
import Placeholder from '../assets/profile_image_placeholder.webp';
import { Comment } from '../models';
import AdminReviewCard from '../components/AdminReviewCard.vue';
import { router } from '../router';

const comments = ref<Comment | undefined>();
await loadComments(0);

async function loadComments(offset: number) {
	const res = await apiClient.GET('/rating/comment', {
		params: {
			query: {
				limit: 10,
				offset,
				order_by: ['create_ts'],
				unreviewed: true,
			},
		},
	});
	console.log(res);
	comments.value = res.data;
}
</script>

<style scoped>
a {
	color: black;
	opacity: 0.87;

	&visited {
		color: black;
		opacity: 0.87;
	}
}
</style>
