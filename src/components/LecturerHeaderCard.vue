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
				<v-chip-group>
					<v-chip
						size="small"
						:color="props.selectedSubject === null ? 'primary' : ''"
						@click="emit('select-subject', null)"
					>
						Все
					</v-chip>

					<v-chip
						v-for="subject in subjectsToShow"
						:key="subject"
						size="small"
						:color="props.selectedSubject === subject ? 'primary' : ''"
						@click="emit('select-subject', subject)"
					>
						{{ subject }}
					</v-chip>
				</v-chip-group>
			</div>
		</template>
	</v-card>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();

const props = defineProps({
	photo: { type: String, required: true },
	lastName: { type: String, required: true },
	firstName: { type: String, required: true },
	middleName: { type: String, required: true },
	subjects: {
		type: null as unknown as PropType<Array<string> | null>,
		required: false,
		default: null,
	},
	selectedSubject: {
		type: String as PropType<string | null>,
		default: null,
	},
});

const emit = defineEmits<{
	(e: 'select-subject', subject: string | null): void;
}>();

const subjectsToShow = computed(() => {
	return props.subjects ? props.subjects.filter(item => item !== null) : [];
});
</script>
