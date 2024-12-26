import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, LocalStorageItem } from '../models/LocalStorage';
import { setupAuth } from '@profcomff/api-uilib';

export const useProfileStore = defineStore('profile', () => {
	const id = ref<number | null>(null);
	const email = ref<string | null>(null);
	const token = ref<string | undefined>(undefined);
	const groups = ref<number[] | null>(null);
	const indirectGroups = ref<number[] | null>(null);
	const userScopes = ref<string[] | null>(null);
	const sessionScopes = ref<string[] | null>(null);

	const full_name = ref<string | null>(null);

	const fromUrl = () => {
		const url = new URL(document.location.toString());

		const localToken = LocalStorage.get(LocalStorageItem.Token);
		const localScopes = LocalStorage.getObject<string[]>(LocalStorageItem.TokenScopes);
		const urlToken = url.searchParams.get('token');
		const urlScopes = url.searchParams.get('scopes')?.split(',');

		if (urlToken === null && urlScopes === undefined) {
			token.value = localToken === 'null' ? undefined : (localToken ?? undefined);
			sessionScopes.value = localScopes;
		} else {
			token.value = urlToken === null ? undefined : urlToken;
			sessionScopes.value = urlScopes || [];
			LocalStorage.set(LocalStorageItem.Token, urlToken);
			LocalStorage.set(LocalStorageItem.TokenScopes, urlScopes ?? []);
		}

		setupAuth(token.value);

		const currId = url.searchParams.get('user_id') ?? LocalStorage.get(LocalStorageItem.UserId) ?? undefined;
		if (currId) {
			id.value = Number(currId);
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
