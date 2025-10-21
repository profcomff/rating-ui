import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Subject } from '@/models';

export const useSearchStore = defineStore('search', () => {
	const name = ref<string>('');
	const subject = ref<Subject>('');
	const order = ref<string>('по общей оценке');
	const ascending = ref<boolean>(false);
	const page = ref<number>(1);
	const mark = ref<string>('');

	const getParams = () => {
		return {
			name: name.value,
			subject: subject.value,
			order: order.value,
			ascending: ascending.value,
			page: page.value,
			mark: mark.value,
		};
	};

	const setParams = (
		oldName: string,
		oldSubject: Subject,
		oldOrder: string,
		oldAsc: boolean,
		oldPage: number,
		oldMark?: string,
	) => {
		name.value = oldName;
		subject.value = oldSubject;
		order.value = oldOrder;
		ascending.value = oldAsc;
		page.value = oldPage;
		mark.value = oldMark || '';
	};

	return {
		name,
		subject,
		order,
		ascending,
		page,
		mark,

		getParams,
		setParams,
	};
});
