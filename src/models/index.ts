import { components } from '@profcomff/api-uilib/src/openapi/rating';

export type Comment = components['schemas']['CommentGetAll'];

export enum ToastType {
	Error = 'error',
	Warn = 'warn',
	Info = 'info',
}

export interface Toast {
	title: string;
	type?: ToastType;
	description?: string;
}

export type Order =
	| 'mark_general'
	| 'mark_kindness'
	| 'mark_freebie'
	| 'mark_clarity'
	| 'mark_weighted'
	| 'last_name'
	| undefined;
export enum OrderFromText {
	'по релевантности' = 'mark_weighted',
	'по общей оценке' = 'mark_general',
	'по доброте' = 'mark_kindness',
	'по халявности' = 'mark_freebie',
	'по понятности' = 'mark_clarity',
	'по фамилии' = 'last_name',
}
export type Subject = string;
export type Lecturer = components['schemas']['LecturerGet'];
