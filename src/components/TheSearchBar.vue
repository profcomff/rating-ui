<template>
	<v-text-field
		id="start"
		v-model="searchQuery"
		prepend-inner-icon="mdi-magnify"
		class="mt-2"
		variant="outlined"
		density="compact"
		placeholder="Поиск преподавателя"
		clearable
		hide-details="auto"
		single-line
		rounded="lg"
		@update:model-value="emits('find-lecturer')"
	>
		<template #append-inner>
			<v-menu location-strategy="connected" scroll-strategy="close" location="start">
				<template #activator="{ props }">
					<v-btn
						v-bind="props"
						:icon="'mdi-filter-variant'"
						color="grey"
						variant="text"
						focused
						density="compact"
					/>
				</template>
				<v-card class="w-100">
					<template #text>
						<v-combobox
							v-model="subject"
							class="text-body-1 mb-2"
							label="Предмет"
							:items="[''].concat(SUBJECTS)"
							density="compact"
							variant="outlined"
							hide-details="auto"
							clearable
							@click:clear="subject = ''"
							@click.stop
						/>

						<v-text-field
							v-model="mark"
							class="text-body-1 mb-2"
							label="Минимальный рейтинг от -2 до 2"
							type="number"
							min="-2"
							max="2"
							step="0.1"
							density="compact"
							variant="outlined"
							hide-details="auto"
							@click.stop
						/>

						<v-row class="w-100 mb-2" no-gutters align="center">
							<v-select
								v-model="order"
								class="text-body-1"
								label="Сортировка"
								:items="orderTypes"
								variant="outlined"
								density="compact"
								hide-details="auto"
								@click.stop
							/>
							<v-btn
								:icon="iconAscDesc"
								density="comfortable"
								variant="plain"
								@click.stop="changeAscDesc"
							></v-btn>
						</v-row>

						<v-btn
							class="w-100 mb-2"
							color="primary"
							variant="tonal"
							density="default"
							prepend-icon="mdi-share-variant"
							text="Поделиться поиском"
							@click="shareSearch"
						/>

						<v-btn
							v-if="isAdmin"
							class="w-100"
							color="red"
							variant="flat"
							density="compact"
							text="админка"
							@click="$router.push('admin')"
						/>
					</template>
				</v-card>
			</v-menu>
		</template>
	</v-text-field>

	<v-snackbar v-model="shareSuccess" color="success" timeout="2000"> Ссылка скопирована в буфер обмена </v-snackbar>
</template>

<script setup lang="ts">
import { SUBJECTS } from '@/constants';
import { ref } from 'vue';
import { copyUrlToClipboard } from '@/utils';

const propsParent = defineProps({
	isAdmin: { type: Boolean, required: true },
	ascending: { type: Boolean, required: true },
	page: { type: Number, default: 1 },
});

const searchQuery = defineModel('searchQuery', { type: String });
const subject = defineModel('subject', { type: String });
const order = defineModel('order', { type: String });
const mark = defineModel('mark', { type: String });

const orderTypes = [
	'по релевантности',
	'по общей оценке',
	'по доброте',
	'по халявности',
	'по понятности',
	'по фамилии',
];
const iconAscDesc = ref<string>('');
const shareSuccess = ref(false);

const emits = defineEmits({
	'find-lecturer': () => {
		return true;
	},
	'changed-asc-desc': () => {
		return true;
	},
});

iconAscDesc.value = propsParent.ascending ? 'mdi-sort-alphabetical-ascending' : 'mdi-sort-alphabetical-descending';

function changeAscDesc() {
	iconAscDesc.value =
		iconAscDesc.value === 'mdi-sort-alphabetical-descending'
			? 'mdi-sort-alphabetical-ascending'
			: 'mdi-sort-alphabetical-descending';
	emits('changed-asc-desc');
}


async function shareSearch() {
	/* eslint-disable @typescript-eslint/no-explicit-any */
	const params: Record<string, any> = {};

	if (searchQuery.value) params.query = searchQuery.value;
	if (order.value && order.value !== 'по релевантности') params.order = order.value;
	if (subject.value) params.subject = subject.value;
	if (propsParent.page > 1) params.page = propsParent.page;
	if (mark.value) params.mark = mark.value;

	// Значение ascending обратное иконке (если иконка ascending, то значение false)
	const isAscending = iconAscDesc.value === 'mdi-sort-alphabetical-ascending';
	if (!isAscending) params.asc = false;

	shareSuccess.value = await copyUrlToClipboard(params);
	setTimeout(() => {
		shareSuccess.value = false;
	}, 2000);
}
</script>
