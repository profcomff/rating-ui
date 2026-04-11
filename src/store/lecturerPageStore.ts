import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '@/api';
import { Lecturer, ToastType } from '@/models';
import { getPhoto } from '@/utils';
import Placeholder from '@/assets/profile_image_placeholder.webp';
import { useToastStore } from './toastStore';

export const useLecturerPageStore = defineStore('lecturerPage', () => {
	const toastStore = useToastStore();

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
			const { data, error } = await apiClient.GET(`/rating/lecturer/{id}`, {
				params: {
					path: { id: lecturerId.value },
					query: {
						info: ['comments'],
					},
				},
			});

			if (error) throw new Error('Не пришли данные');

			lecturer.value = data;
			lecturerPhoto.value = getPhoto(data.avatar_link);
		} catch {
			toastStore.push({ title: 'Ошибка при запросе преподавателя', type: ToastType.Error });
		} finally {
			loading.value = false;
		}
	}

	async function fetchComments(subject?: string | null) {
		if (!lecturerId.value || !lecturer.value) return;

		try {
			const { data, error } = await apiClient.GET(`/rating/comment`, {
				params: {
					query: {
						lecturer_id: lecturerId.value,
						subject: subject ?? undefined,
					},
				},
			});

			if (error) throw new Error('Не пришли данные');

			lecturer.value.comments = data.comments ?? [];
		} catch {
			toastStore.push({ title: 'Ошибка при запросе комментариев', type: ToastType.Error });
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
		await fetchComments(typeof subject === 'string' ? subject.toLowerCase() : null);
	}

	function reset() {
		lecturerId.value = null;
		lecturer.value = null;
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
		reset,
	};
});
