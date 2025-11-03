export function formatMark(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return '—';
	return mark > 0 ? `+${mark.toFixed(1)}` : mark.toFixed(1);
}

export function getMarkColor(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return 'grey';
	return mark > 0 ? 'green' : mark === 0 ? 'grey' : 'red';
}
