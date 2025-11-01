<script setup lang="ts">
import { useProfileStore } from '@/store';
import { onMounted } from 'vue';
import ToastList from '@/components/ToastList.vue';
import { useToastStore } from './store/toastStore';
import { ToastType } from './models';

const profileStore = useProfileStore();
const toastStore = useToastStore();

onMounted(async () => {
	profileStore.clearLocalStorage();
	profileStore.fromUrl();
	if (import.meta.env.MODE === 'development') await profileStore.setupDevAdminSession(null);
	if (!profileStore.isLoggedIn) {
		toastStore.push({
			title: 'Не получится оставить отзыв',
			description: 'Вы не вошли в профиль',
			type: ToastType.Error,
		});
	}
	console.log(profileStore.token);
});
</script>

<template>
	<v-app>
		<main class="main">
			<Suspense>
				<RouterView />
				<template #fallback>Loading...</template>
			</Suspense>
			<ToastList />
		</main>
	</v-app>
</template>

<style scoped>
.main {
	width: min(900px, 100%);
	margin: 0 auto;
}
</style>
