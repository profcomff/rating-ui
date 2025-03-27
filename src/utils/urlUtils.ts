export const BASE_URL = 'https://app.profcomff.com/44';

export function getLecturerUrl(lecturerId: number): string {
	return `${BASE_URL}/lecturer?lecturer_id=${lecturerId}`;
}

export function getReviewUrl(reviewId: string): string {
	return `${BASE_URL}/review?review_id=${reviewId}`;
}

export function getSearchUrl(params: Record<string, string>): string {
	const searchParams = new URLSearchParams(params);
	return `${BASE_URL}/search?${searchParams.toString()}`;
}

export async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Ошибка при копировании в буфер обмена:', err);
		throw err;
	}
}
