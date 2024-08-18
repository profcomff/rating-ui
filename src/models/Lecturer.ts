export interface Lecturer {
	id: number;
	first_name: string;
	last_name: string;
	middle_name: string;
	avatar_id?: number | null | undefined;
	avatar_link?: string | null | undefined;
	description?: string | null | undefined;
}
