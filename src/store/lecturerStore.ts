import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '@/api';
import { Lecturer, Order } from '@/models';
import { getPhoto } from '@/utils';
import Placeholder from '@/assets/profile_image_placeholder.webp';

interface FetchLecturersParams {
	page: number;
	itemsPerPage: number;
	name?: string;
	subject?: string;
	orderBy?: Order;
	ascending?: boolean;
	mark?: string;
}

export const useLecturerStore = defineStore('lecturer', () => {
	// State
	const lecturers = ref<Lecturer[]>([]);
	const lecturersPhotos = ref<string[]>([]);
	const totalPages = ref(1);

	// Actions
	async function fetchLecturers(params: FetchLecturersParams) {
		const offset = (params.page - 1) * params.itemsPerPage;

		// Создаем объект параметров запроса
		const queryParams: Record<string, unknown> = {
			limit: params.itemsPerPage,
			offset,
			info: ['comments'],
			order_by: `${params.ascending ? '+' : '-'}${params.orderBy ?? 'mark_general'}`,
		};

		// Добавляем опциональные параметры
		if (params.name) queryParams.name = params.name;
		if (params.subject) queryParams.subject = params.subject;
		if (params.mark) queryParams.mark = params.mark;

		const res = await apiClient.GET('/rating/lecturer', {
			params: {
				query: queryParams,
			},
		});

		lecturers.value = res.data?.lecturers || [];
		totalPages.value = res.data?.total ? Math.ceil(res.data.total / params.itemsPerPage) : 1;

		lecturersPhotos.value = lecturers.value.map(item => getPhoto(item.avatar_link)) ?? [Placeholder];
	}

	return {
		lecturers,
		lecturersPhotos,
		totalPages,
		fetchLecturers,
	};
});
