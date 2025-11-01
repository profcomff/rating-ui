import { defineStore } from 'pinia';
import { ref } from 'vue';
import { LocalStorage, LocalStorageItem } from '../models/LocalStorage';
import { setupAuth } from '@profcomff/api-uilib';
import apiClient from '@/api';

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
			sessionScopes.value = [];
		} else {
			token.value = urlToken;
			isLoggedIn.value = true;
			sessionScopes.value = urlScopes ?? [];
		}

		setupAuth(token.value);
	};

	const TVOI_FF_TEST_TOKEN = import.meta.env.VITE_TVOI_FF_TOKEN;

	async function setupDevAdminSession(tvff_token: string | null) {
		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);

		const serviceScopes = [
			'comment.create',
			'comment.delete',
			'comment.import',
			'comment.review',
			'lecturer.comment.delete',
			'lecturer.comment.review',
		];
		const serviceName = 'rating';
		const scopes = serviceScopes.map(value => `${serviceName}.${value}`);

		const { data, error } = await apiClient.POST('/auth/session', {
			body: {
				scopes,
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
			},
		});

		if (error) {
			console.log('Ошибка при попытке авторизоваться');
			isLoggedIn.value = false;
			return;
		}
		token.value = data.token || '';
		sessionScopes.value = data.session_scopes ?? [];

		setupAuth(data.token || '');
		isLoggedIn.value = true;
		console.log(token);
	}

	async function setupDevUserSession(tvff_token: string | null) {
		setupAuth(tvff_token ?? TVOI_FF_TEST_TOKEN);
	}

	const isAdmin = () => {
		return sessionScopes.value?.includes('rating.comment.review') ?? false;
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
		setupDevAdminSession,
		setupDevUserSession,
		isAdmin,
		clearLocalStorage,
	};
});
