// src/utils/marks.ts

/**
 * Форматирует числовое значение оценки в строку.
 * @param mark - Оценка (число, null или undefined).
 * @returns Отформатированная строка ('+4.5', '-2.0', '0.0', '—').
 */
export function formatMark(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return '—';
	return mark > 0 ? `+${mark.toFixed(1)}` : mark.toFixed(1);
}

/**
 * Возвращает цвет для фона оценки в зависимости от её значения.
 * @param mark - Оценка (число, null или undefined).
 * @returns Название цвета ('green', 'red', 'grey').
 */
export function getMarkColor(mark: number | null | undefined): string {
	if (mark === null || mark === undefined) return 'grey';
	return mark > 0 ? 'green' : mark === 0 ? 'grey' : 'red';
}
