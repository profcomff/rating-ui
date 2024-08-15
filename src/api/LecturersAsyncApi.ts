import { Lecturer } from './../models/Lecturer';
import { Ref } from 'vue';
import apiClient from '.';
import Placeholder from '../assets/profile_image_placeholder.webp';

export type OrderBy = 'first_name' | 'last_name' | null | undefined;

export async function loadLecturers(lecturers: Ref, lecturersPhotos: Ref, offset: number, order_by: OrderBy) {
	const query = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				offset,
				order_by,
			},
		},
	});
	lecturers.value = query.data?.items;
	loadPhotos(lecturers, lecturersPhotos);
	console.log(lecturers.value);
}

export function loadPhotos(lecturers: Ref, lecturersPhotos: Ref) {
	return (lecturersPhotos.value = lecturers.value?.map((item: Lecturer) =>
		item.avatar_link ? `${import.meta.env.VITE_AUTH_API_BASE_URL}${item.avatar_link}` : Placeholder,
	));
}

export async function findLecturers(lecturers: Ref<Lecturer[]>, lecturersPhotos: Ref, query: Ref, order_by: OrderBy) {
	console.log(query.value);
	const res = await apiClient.GET('/timetable/lecturer/', {
		params: {
			query: {
				query: query.value,
				order_by: order_by,
			},
		},
	});
	lecturers.value = res.data?.items;
	console.log(lecturers.value);
	loadPhotos(lecturers, lecturersPhotos);
}
