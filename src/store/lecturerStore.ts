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
}

export const useLecturerStore = defineStore('lecturer', () => {
	// State
	const lecturers = ref<Lecturer[]>([]);
	const lecturersPhotos = ref<string[]>([]);
	const totalPages = ref(1);

	// Actions
	async function fetchLecturers(params: FetchLecturersParams) {
		const offset = (params.page - 1) * params.itemsPerPage;
		const res = await apiClient.GET('/rating/lecturer', {
			params: {
				query: {
					limit: params.itemsPerPage,
					name: params.name,
					offset,
					info: ['comments', 'mark'],
					subject: params.subject,
					order_by: params.orderBy,
					asc_order: params.ascending,
				},
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
