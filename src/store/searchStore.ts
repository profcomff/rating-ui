import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Subject } from '@/models';

export const useSearchStore = defineStore('search', () => {
	const name = ref<string>('');
	const subject = ref<Subject>('');
	const order = ref<string>('по общей оценке');
	const ascending = ref<boolean>(false);
	const page = ref<number>(1);

	const getParams = () => {
		return name.value, subject.value, order.value, ascending.value, page.value;
	};

	const setParams = (oldName: string, oldSubject: Subject, oldOrder: string, oldAsc: boolean, oldPage: number) => {
		name.value = oldName;
		subject.value = oldSubject;
		order.value = oldOrder;
		ascending.value = oldAsc;
		page.value = oldPage;
	};

	return {
		name,
		subject,
		order,
		ascending,
		page,

		getParams,
		setParams,
	};
});
