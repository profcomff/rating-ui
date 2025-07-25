export interface Review {
	id: string;
	subject: string;
	text: string;

	mark_kindness: number;
	mark_freebie: number;
	mark_clarity: number;

	is_anonymous: boolean;
}
