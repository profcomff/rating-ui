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
				<v-chip-group v-model="selectedSubject">
					<v-chip size="small" key="Все" :value="null" :color="!selectedSubject ? 'primary' : 'error'">
						Все
					</v-chip>

					<v-chip
						v-for="subject in subjectsToShow"
						:key="subject"
						:value="subject"
						size="small"
						:color="selectedSubject === subject ? 'primary' : ''"
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
});

const selectedSubject = defineModel('selectedSubject', {
	type: String as PropType<string | null>,
	default: null,
});

const subjectsToShow = computed(() => {
	return props.subjects ? props.subjects.filter(item => item !== null) : [];
});
</script>
