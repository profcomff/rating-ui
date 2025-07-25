import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, LocalStorageItem } from '@/models/LocalStorage';
import type { Review } from '@/models/review';

export const useReviewStore = defineStore('review', () => {
	const reviewList = ref<Review[]>([]);

	const loadReviews = () => {
		const stored = LocalStorage.getObject<Review[]>(LocalStorageItem.ReviewList);
		reviewList.value = stored || [];
	};

	const getById = (id: string): Review | null => {
		loadReviews();
		return reviewList.value.find(review => review.id === id) || null;
	};

	const save = (id: string, fields: Omit<Review, 'id'>) => {
		loadReviews();

		const newReview: Review = { id, ...fields };
		const index = reviewList.value.findIndex(r => r.id === id);

		if (index >= 0) {
			reviewList.value[index] = newReview;
		} else {
			reviewList.value.push(newReview);
		}

		LocalStorage.set(LocalStorageItem.ReviewList, reviewList.value);
	};

	const removeById = (id: string) => {
		loadReviews();
		reviewList.value = reviewList.value.filter(review => review.id !== id);
		LocalStorage.set(LocalStorageItem.ReviewList, reviewList.value);
	};

	return {
		reviewList,
		loadReviews,
		getById,
		save,
		removeById,
	};
});
