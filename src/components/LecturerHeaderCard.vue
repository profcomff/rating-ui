<template>
	<v-card class="container" width="100%" variant="flat" rounded="xl">
		<template #prepend>
			<v-avatar :size="mobile ? 80 : 120" rounded="circle" :image="photo" />
		</template>
		<template #title>
			<div :class="mobile ? 'text-h6' : 'text-h4'">{{ lastName }}</div>
		</template>
		<template #subtitle>
			<div class="text-body-1">{{ firstName }} {{ middleName }}</div>
			<div class="text-body-2">
				<v-chip-group v-if="subjectsToShow">
					<v-chip v-for="(subject, index) in subjectsToShow" :key="index" outlined size="small">
						{{ subject }}
					</v-chip>
				</v-chip-group>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

const props = defineProps({
	photo: { type: String, required: true },
	lastName: { type: String, required: true },
	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	subjects: {
		type: null as unknown as PropType<Array<String> | null>,
		required: false,
		default: null,
	},
});

const subjectsToShow = props.subjects ? props.subjects.filter((item: unknown) => item !== null) : null;
</script>
