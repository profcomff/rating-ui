import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('../pages/MainPage.vue'),
	},
	{
		path: '/teacher',
		component: () => import('../pages/TeacherPage.vue'),
	},
	{
		path: '/review',
		component: () => import('../pages/ReviewPage.vue'),
	}
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(to => {
	console.log(to);
});
