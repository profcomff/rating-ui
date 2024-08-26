<template>
	<!-- TODO: fix positioning and width -->
	<!-- TODO: add tripple dot menu -->
	<v-card class="my-1 py-1 px-0 mx-3" variant="tonal" rounded="xl">
		<template #prepend>
			<div class="d-flex align-center">
				<v-avatar size="50" rounded="circle" class="mr-2">
					<v-img :src="photo" rounded="circle"></v-img>
				</v-avatar>
			</div>
		</template>
		<template #title>
			<div class="text-h6">{{ 'Иванов Иван' }}</div>
		</template>
		<template #subtitle>
			<div class="text-h7">{{ '22 августа 2024' }}</div>
		</template>
		<template #text>
			<v-row no-gutters justify="space-between">
				<v-col class="text-left">
					Доброта: <strong>{{ '+2' }}</strong>
				</v-col>
				<v-col class="text-center">
					Халявность: <strong>{{ '+2' }}</strong>
				</v-col>
				<v-col class="text-center">
					Понятность: <strong>{{ '+2' }}</strong>
				</v-col>
				<v-col class="text-right">
					<strong>{{ '+2' }}</strong>
				</v-col>
			</v-row>
			<p>Lorem Ipsum</p>
			<div class="d-flex justify-end">
				<v-btn :prepend-icon="'mdi-thumb-up-outline'" variant="plain" :text="'123'" />
				<v-btn :prepend-icon="'mdi-thumb-down-outline'" variant="plain" :text="'123'" />
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
defineProps({
	photo: { type: String, required: true },
});
</script>
