import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import { useProfileStore } from '@/store';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/pages/MainPage.vue'),
	},
	{
		path: '/lecturer',
		component: () => import('@/pages/LecturerPage.vue'),
	},
	{
		path: '/review',
		component: () => import('@/pages/ReviewPage.vue'),
	},
	{
		path: '/admin',
		component: () => import('@/pages/AdminPage.vue'),
		beforeEnter: adminValidation,
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

async function adminValidation() {
	const profileStore = useProfileStore();
	if (profileStore.isAdmin()) {
		return true;
	} else {
		return { path: '/' };
	}
}
