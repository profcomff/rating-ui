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
				<v-col>
					Доброта: <strong>{{ comment.raw.mark_kindness }}</strong>
				</v-col>
				<v-col class="text-center">
					Халявность: <strong>{{ comment.raw.mark_freebie }}</strong>
				</v-col>
				<v-col class="text-right">
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
	</v-card>
</template>

<script setup lang="ts">
import apiClient from '@/api';
import { onMounted, onUpdated, ref } from 'vue';
import { useProfileStore } from '@/store';

const profileStore = useProfileStore();
const isUserAdmin = ref(false);
isUserAdmin.value = profileStore.isAdmin();
const propsLocal = defineProps({
	photo: { type: String, required: true },
	comment: { type: Object, required: true },
});

const emit = defineEmits(['comment-deleted']);

const markGeneral = ref(0);
const redactedText = ref<String[]>([]);

async function deleteComment() {
	console.log(propsLocal.comment);
	await apiClient.DELETE('/rating/comment/{uuid}', {
		params: { path: { uuid: propsLocal.comment.raw.uuid } },
	});
	emit('comment-deleted');
}

function cleanupText(text: string) {
	return text
		.replace(/&lt;/g, '<')
		.replace(/&rt;/g, '>')
		.replace(/\\\\&quot;/g, '"')
		.replace(/\\\\/g, '\\')
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
