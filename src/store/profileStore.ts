import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, LocalStorageItem } from '../models/LocalStorage';
import { setupAuth } from '@profcomff/api-uilib';

export const useProfileStore = defineStore('profile', () => {
	const token = ref<string | undefined>(undefined);
	const groups = ref<number[] | null>(null);
	const sessionScopes = ref<string[] | null>(null);
	const isLoggedIn = ref<boolean>(false);

	const full_name = ref<string | null>(null);

	const fromUrl = () => {
		const url = new URL(document.location.toString());

		const urlToken = url.searchParams.get('token');
		const urlScopes = url.searchParams.get('scopes')?.split(',');

		if (urlToken === null) {
			token.value = undefined;
			isLoggedIn.value = false;
		} else {
			token.value = urlToken;
			isLoggedIn.value = true;
			sessionScopes.value = urlScopes ?? [];
		}

		setupAuth(token.value);
	};

	const isAdmin = () => {
		return (
			(sessionScopes.value?.includes('rating.comment.review') &&
				sessionScopes.value?.includes('rating.comment.review')) ??
			false
		);
	};

	const clearLocalStorage = () => {
		LocalStorage.delete(LocalStorageItem.Token, LocalStorageItem.TokenScopes, LocalStorageItem.UserId);
	};

	return {
		token,
		groups,
		isLoggedIn,

		full_name,

		fromUrl,
		isAdmin,
		clearLocalStorage,
	};
});
