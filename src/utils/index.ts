import { PHOTO_BASE_PATH } from '@/constants';
import Placeholder from '@/assets/profile_image_placeholder.webp';

export function getPhoto(link: string | null | undefined) {
	return link === '' ? Placeholder : `${PHOTO_BASE_PATH}${link}`;
}

export function adaptNumeral(number: number | undefined, singular: string, plural_small: string, plural_big: string) {
	if (!number) {
		return plural_big;
	} else {
		if (number % 10 == 1 && number % 100 != 11) {
			return singular;
		} else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
			return plural_small;
		} else {
			return plural_big;
		}
	}
}

/**
 * Копирует URL с параметрами в буфер обмена
 * @param params Объект с параметрами для URL
 * @param path Путь URL (например, 'lecturer')
 * @returns Promise<boolean> Успешно ли скопирован URL
 */
export async function copyUrlToClipboard(params: Record<string, any>, path: string = ''): Promise<boolean> {
	try {
		const url = new URL(window.location.href);
		const baseUrl = `${url.origin}${url.pathname}`;

		// Создаем новый URL с базовым путем и добавляем указанный путь
		const shareUrl = new URL(path, baseUrl);

		// Добавляем все параметры в URL
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null && value !== '') {
				shareUrl.searchParams.set(key, String(value));
			}
		});

		await navigator.clipboard.writeText(shareUrl.toString());
		return true;
	} catch (error) {
		console.error('Ошибка при копировании URL:', error);
		return false;
	}
}
