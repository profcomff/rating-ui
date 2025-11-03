<template>
	<v-card class="my-2 px-0" variant="elevated" rounded="xl">
		<template #prepend>
			<div class="d-flex align-center">
				<v-avatar size="50" rounded="circle" class="mr-2">
					<v-img :src="photo" rounded="circle"></v-img>
				</v-avatar>
			</div>
		</template>
		<template #title>
			<div class="text-h6">{{ 'Анонимный' }}</div>
		</template>
		<template #subtitle>
			<div class="text-h7">
				{{ Intl.DateTimeFormat().format(Date.parse(comment.raw.create_ts)) }}
			</div>
		</template>
		<template #text>
			<v-row no-gutters justify="space-between">
				<v-col :cols="mobile ? 3 : 'auto'">
					Доброта: <strong>{{ comment.raw.mark_kindness }}</strong>
				</v-col>
				<v-col class="text-center" :cols="mobile ? 4 : 'auto'">
					Халявность: <strong>{{ comment.raw.mark_freebie }}</strong>
				</v-col>
				<v-col class="text-right" :cols="mobile ? 4 : 'auto'">
					Понятность: <strong>{{ comment.raw.mark_clarity }}</strong>
				</v-col>
			</v-row>
			<div v-for="(paragraph, idx) in redactedText" :key="idx">
				<p class="mt-2">{{ paragraph }}</p>
			</div>
		</template>
		<template #append>
			<v-col class="text-right">
				<strong>{{ (markGeneral > 0 ? '+' : '') + markGeneral.toFixed(2) }}</strong>
			</v-col>
			<v-col v-if="isUserAdmin">
				<v-menu location-strategy="connected" location="bottom">
					<template #activator="{ props }">
						<v-btn
							v-bind="props"
							:icon="'mdi-dots-vertical'"
							color="white"
							variant="flat"
							focused
							density="compact"
						/>
					</template>
					<v-card width="200">
						<template #text>
							<v-btn class="w-100" color="red" text="Удалить" @click.stop="deleteComment" />
						</template>
					</v-card>
				</v-menu>
			</v-col>
		</template>
		<template #actions>
			<v-btn
				class="px-0 pl-4"
				style="max-width: 51px; min-width: 51px;"
				@click="changeReaction('like')"
				density="compact"
				size="large"
				:color="isLiked ? 'primary' : 'default'"
				:prepend-icon="isLiked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline'"
			>
				{{ like_count }}
			</v-btn>
			<v-btn
				class="px-0 pl-4"
				style="max-width: 51px; min-width: 51px;"
				@click="changeReaction('dislike')"
				density="compact"
				size="large"
				:color="isDisliked ? 'primary' : 'default'"
				:prepend-icon="isDisliked ? 'mdi-thumb-down' : 'mdi-thumb-down-outline'"
			>
				{{ dislike_count }}
			</v-btn>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import apiClient from '@/api';
import { onMounted, onUpdated, ref } from 'vue';
import { useProfileStore } from '@/store';
import { useDisplay } from 'vuetify';

const profileStore = useProfileStore();
const { mobile } = useDisplay();
const isUserAdmin = ref(false);
isUserAdmin.value = profileStore.isAdmin();
const propsLocal = defineProps({
	photo: { type: String, required: true },
	comment: { type: Object, required: true },
});
const isLiked = ref(false);
const like_count = ref(propsLocal.comment.raw.like_count);

const isDisliked = ref(false);
const dislike_count = ref(propsLocal.comment.raw.dislike_count);

const emit = defineEmits(['comment-deleted']);

const markGeneral = ref(0);
const redactedText = ref<string[]>([]);

async function changeReaction(action: 'like' | 'dislike') {
	try {
		const response = await apiClient.PUT('/rating/comment/{uuid}/{reaction}', {
			params: {
				path: {
					uuid: propsLocal.comment.raw.uuid,
					reaction: action,
				},
			},
		});
		like_count.value = response.data?.like_count;
		dislike_count.value = response.data?.dislike_count;
		if (action === 'like') {
			like_count.value = response.data?.like_count;
			isLiked.value = !isLiked.value;
			isDisliked.value = false;
		} else if (action === 'dislike') {
			isDisliked.value = !isDisliked.value;
			isLiked.value = false;
		}
	} catch (error) {
		console.error('Ошибка реакции:', error);
	}
}



async function deleteComment() {
	await apiClient.DELETE('/rating/comment/{uuid}', {
		params: { path: { uuid: propsLocal.comment.raw.uuid } },
	});
	emit('comment-deleted');
}

function cleanupText(text: string) {
	return text
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/\\\\&quot;/g, '"')
		.replace(/\\\\/g, '\\')
		.replace(/\\r/g, '')
		.replace(/<br \/>/g, '')
		.replace(/\\"/g, '"')
		.replace(/\\"/g, '"')
		.split('\\n');
}

onUpdated(() => {
	markGeneral.value =
		(propsLocal.comment.raw.mark_clarity +
			propsLocal.comment.raw.mark_kindness +
			propsLocal.comment.raw.mark_freebie) /
		3;
	redactedText.value = cleanupText(propsLocal.comment.raw.text);
});

onMounted(() => {
	markGeneral.value =
		(propsLocal.comment.raw.mark_clarity +
			propsLocal.comment.raw.mark_kindness +
			propsLocal.comment.raw.mark_freebie) /
		3;
	redactedText.value = cleanupText(propsLocal.comment.raw.text);
});
</script>
