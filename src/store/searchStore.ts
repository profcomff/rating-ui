import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Lecturer, Subject } from '@/models';

export const useSearchStore = defineStore('search', () => {
	const name = ref<string>('');
	const subject = ref<Subject>('');
	const order = ref<string>('по общей оценке');
	const ascending = ref<boolean>(true);
	const page = ref<number>(1);
	const lecturers = ref<Lecturer[] | undefined>();

	const getParams = () => {
		return name.value, subject.value, order.value, ascending.value, page.value, lecturers.value;
	};

	const setParams = (
		oldName: string,
		oldSubject: Subject,
		oldOrder: string,
		oldAsc: boolean,
		oldPage: number,
		oldLecturers: Lecturer[] | undefined,
	) => {
		console.log(oldName, oldSubject, oldOrder, oldAsc, oldPage);
		name.value = oldName;
		subject.value = oldSubject;
		order.value = oldOrder;
		ascending.value = oldAsc;
		page.value = oldPage;
		lecturers.value = oldLecturers;
	};

	return {
		name,
		subject,
		order,
		ascending,
		page,
		lecturers,

		getParams,
		setParams,
	};
});
