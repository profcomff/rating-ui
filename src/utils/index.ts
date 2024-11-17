import { PHOTO_BASE_PATH } from '@/constants';
import Placeholder from '@/assets/profile_image_placeholder.webp';

export function getPhoto(link: string | null | undefined) {
	return link === 'NULL' ? Placeholder : `${PHOTO_BASE_PATH}${link}`;
}
