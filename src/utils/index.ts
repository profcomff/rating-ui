import { PHOTO_BASE_PATH } from '@/constants';
import Placeholder from '@/assets/profile_image_placeholder.webp';

export function getPhoto(link: string | null | undefined) {
	return link === 'NULL' ? Placeholder : `${PHOTO_BASE_PATH}${link}`;
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
