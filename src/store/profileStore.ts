import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, LocalStorageItem } from '../models/LocalStorage';

export const useProfileStore = defineStore('profile', () => {
	const id = ref<number | null>(null);
	const email = ref<string | null>(null);
	const token = ref<string | null>();
	const groups = ref<number[] | null>(null);
	const indirectGroups = ref<number[] | null>(null);
	const userScopes = ref<string[] | null>(null);
	const sessionScopes = ref<string[] | null>(null);

	const full_name = ref<string | null>(null);

	const fromUrl = () => {
		const url = new URL(document.location.toString());

		const localToken = LocalStorage.get(LocalStorageItem.Token);
		const urlToken = url.searchParams.get('token');

		if (urlToken === undefined) {
			token.value = localToken;
		} else {
			token.value = urlToken;
			LocalStorage.set(LocalStorageItem.Token, urlToken);
		}

		const localScopes = LocalStorage.getObject<string[]>(LocalStorageItem.TokenScopes);
		const urlScopes = url.searchParams.get('scopes')?.split(',');

		if (urlScopes === undefined) {
			sessionScopes.value = localScopes;
		} else {
			sessionScopes.value = urlScopes;
			LocalStorage.set(LocalStorageItem.TokenScopes, urlScopes);
		}

		const currId = url.searchParams.get('user_id') ?? LocalStorage.get(LocalStorageItem.UserId) ?? undefined;
		if (currId) {
			id.value = +currId;
		}
	};

	const isAdmin = () => {
		return (
			(sessionScopes.value?.includes('rating.comment.review') &&
				sessionScopes.value?.includes('rating.comment.review')) ??
			false
		);
	};

	return {
		id,
		email,
		token,
		groups,
		indirectGroups,
		userScopes,
		sessionScopes,

		full_name,

		fromUrl,
		isAdmin,
	};
});
