import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '@/api';
import { Lecturer } from '@/models';
import { getPhoto } from '@/utils';
import Placeholder from '@/assets/profile_image_placeholder.webp';

export const useLecturerPageStore = defineStore('lecturerPage', () => {
	const lecturer = ref<Lecturer | null>(null);
	const lecturerPhoto = ref<string>(Placeholder);
	const selectedSubject = ref<string | null>(null);
	const lecturerId = ref<number | null>(null);
	const loading = ref(false);
	const howKind = computed(() => lecturer.value?.mark_kindness_weighted ?? 0);
	const howFree = computed(() => lecturer.value?.mark_freebie_weighted ?? 0);
	const howClear = computed(() => lecturer.value?.mark_clarity_weighted ?? 0);
	const lecturerSubjects = computed(() => lecturer.value?.subjects ?? []);

	async function fetchLecturer() {
		if (!lecturerId.value) return;

		loading.value = true;

		try {
			const res = await apiClient.GET(`/rating/lecturer/{id}`, {
				params: {
					path: { id: lecturerId.value },
					query: {
						info: [],
					},
				},
			});

			const data = res.data;

			if (!data) return;

			lecturer.value = data;
			lecturerPhoto.value = getPhoto(data.avatar_link);
		} finally {
			loading.value = false;
		}
	}

	async function fetchComments(subject?: string | null) {
		if (!lecturerId.value || !lecturer.value) return;

		try {
			const res = await apiClient.GET(`/rating/comment`, {
				params: {
					query: {
						lecturer_id: lecturerId.value,
						subject: subject ?? undefined,
					},
				},
			});

			const data = res.data;
			if (!data) return;

			lecturer.value.comments = data.comments ?? [];
		} finally {
			loading.value = false;
		}
	}

	async function init(id: number) {
		lecturerId.value = id;
		selectedSubject.value = null;
		fetchLecturer();
		fetchComments();
	}

	async function filterComments(subject: string | null) {
		selectedSubject.value = subject;
		await fetchComments(subject);
	}

	return {
		lecturer,
		lecturerPhoto,
		selectedSubject,
		loading,
		howKind,
		howClear,
		howFree,
		lecturerSubjects,
		init,
		filterComments,
	};
});
