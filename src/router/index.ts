import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('../pages/MainPage.vue'),
	},
	{
		path: '/teacher-page',
		component: () => import('../pages/TeacherPage.vue'),
	},
];

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach(to => {
	console.log(to);
});
