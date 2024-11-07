import { components } from '@profcomff/api-uilib/src/openapi/rating';

export type Review = components['schemas']['CommentGet'];
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

export type Order = ('general' | '')[];
export type Subject = string;
export type Lecturer = components['schemas']['LecturerGet'];
