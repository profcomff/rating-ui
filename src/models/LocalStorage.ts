export enum LocalStorageItem {
	Token = 'token',
	TokenScopes = 'token-scopes',
	UserId = 'user-id',
}

export class LocalStorage {
	static set<T>(name: LocalStorageItem, body: T) {
		if (typeof body === 'object') {
			localStorage.setItem(name, JSON.stringify(body));
		} else {
			localStorage.setItem(name, `${body}`);
		}
	}

	static getObject<T>(name: LocalStorageItem): T | null {
		const body = localStorage.getItem(name);
		return body ? JSON.parse(body) : null;
	}

	static get(name: LocalStorageItem): string | null {
		return localStorage.getItem(name);
	}

	static delete(...names: LocalStorageItem[]) {
		for (const name of names) {
			localStorage.removeItem(name);
		}
	}
}
